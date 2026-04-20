import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

function PharmacyAdmin() {
    const { t } = useTranslation();
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    
    // Form State
    const [form, setForm] = useState({ medicine_name: '', dosage: '', status: 'In Stock' });

    const fetchInventory = () => {
        fetch('http://localhost:5005/api/pharmacy/inventory', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            setInventory(Array.isArray(data) ? data : []);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchInventory();
    }, [token]);

    const handleAddMedicine = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5005/api/pharmacy/inventory', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error('Failed to add medicine');
            setForm({ medicine_name: '', dosage: '', status: 'In Stock' });
            fetchInventory();
        } catch(err) {
            alert(err.message);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`http://localhost:5005/api/pharmacy/inventory/${id}`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (!res.ok) throw new Error('Failed to update status');
            fetchInventory();
        } catch(err) {
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this medicine?")) return;
        try {
            const res = await fetch(`http://localhost:5005/api/pharmacy/inventory/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete medicine');
            fetchInventory();
        } catch(err) {
            alert(err.message);
        }
    };

    const getStatusStyle = (status) => {
        if (status === 'In Stock') return { color: 'var(--success-green)', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success-green)' };
        if (status === 'Waiting for Delivery') return { color: '#F59E0B', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #F59E0B' };
        return { color: 'var(--danger-red)', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger-red)' };
    };

    const getStatusText = (status) => {
        if (status === 'In Stock') return t('pharmacy.inStock');
        if (status === 'Waiting for Delivery') return t('pharmacy.waiting');
        if (status === 'Out of Stock') return t('pharmacy.outOfStock');
        return status;
    };

    const inStockItems = inventory.filter(i => i.status !== 'Out of Stock');
    const outOfStockItems = inventory.filter(i => i.status === 'Out of Stock');

    const InventoryCard = ({ item }) => (
        <div className="card" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '18px', color: 'var(--text-main)', margin: 0 }}>{item.medicine_name}</h4>
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>{item.dosage || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                    <button className="btn" onClick={() => handleUpdateStatus(item.id, 'In Stock')} style={{ padding: '4px 10px', fontSize: '12px', opacity: item.status === 'In Stock' ? 0.3 : 1 }} disabled={item.status === 'In Stock'}>
                        {t('pharmacy.setInStock')}
                    </button>
                    <button className="btn" onClick={() => handleUpdateStatus(item.id, 'Out of Stock')} style={{ padding: '4px 10px', fontSize: '12px', opacity: item.status === 'Out of Stock' ? 0.3 : 1 }} disabled={item.status === 'Out of Stock'}>
                        {t('pharmacy.setOutOfStock')}
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)} style={{ padding: '4px 10px', fontSize: '12px' }}>
                        {t('pharmacy.remove')}
                    </button>
                </div>
            </div>
            <span style={{ padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', ...getStatusStyle(item.status) }}>
                {getStatusText(item.status)}
            </span>
        </div>
    );

    return (
        <div>
            <h1 className="page-title">{t('pharmacy.adminTitle')}</h1>
            
            <div className="card" style={{ borderColor: 'var(--primary-accent)', padding: '30px' }}>
                <h3 style={{ marginBottom: '20px' }}>{t('pharmacy.addTitle')}</h3>
                <form onSubmit={handleAddMedicine} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '16px', alignItems: 'end' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('pharmacy.medName')}</label>
                        <input type="text" placeholder="e.g. Amoxicillin" required value={form.medicine_name} onChange={e => setForm({...form, medicine_name: e.target.value})} />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('pharmacy.dosage')}</label>
                        <input type="text" placeholder="e.g. 500mg" value={form.dosage} onChange={e => setForm({...form, dosage: e.target.value})} />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('pharmacy.initialStatus')}</label>
                        <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                            <option value="In Stock">{t('pharmacy.inStock')}</option>
                            <option value="Waiting for Delivery">{t('pharmacy.waiting')}</option>
                            <option value="Out of Stock">{t('pharmacy.outOfStock')}</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '14px 24px', height: 'fit-content' }}>{t('pharmacy.addBtn')}</button>
                </form>
            </div>

            <div style={{ marginTop: '40px' }}>
                {loading ? <p>{t('pharmacy.loadingInv')}</p> : (
                    <>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                            <div className="card" style={{ flex: 1, padding: '20px', borderLeft: '4px solid var(--success-green)' }}>
                                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>{t('pharmacy.inStockItems')}</p>
                                <h2 style={{ margin: 0 }}>{inStockItems.length}</h2>
                            </div>
                            <div className="card" style={{ flex: 1, padding: '20px', borderLeft: '4px solid var(--danger-red)' }}>
                                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>{t('pharmacy.outOfStockItems')}</p>
                                <h2 style={{ margin: 0 }}>{outOfStockItems.length}</h2>
                            </div>
                        </div>

                        <h3 style={{ marginBottom: '16px', color: 'var(--success-green)' }}>{t('pharmacy.detailedStock')}</h3>
                        {inventory.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>{t('pharmacy.noMedicinesReg')}</p> : (
                            <div style={{ display: 'grid', gap: '16px' }}>
                                {inventory.sort((a,b) => a.medicine_name.localeCompare(b.medicine_name)).map(item => <InventoryCard key={item.id} item={item} />)}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default PharmacyAdmin;
