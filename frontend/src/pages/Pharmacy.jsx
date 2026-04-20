import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

function Pharmacy() {
    const { t } = useTranslation();
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchInventory(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.warn("Geolocation denied or error, falling back to basic list.", error);
                    fetchInventory();
                }
            );
        } else {
            fetchInventory();
        }
    }, [token]);

    const fetchInventory = (lat, lng) => {
        let url = 'http://localhost:5005/api/pharmacy/inventory';
        if (lat && lng) {
            url += `?lat=${lat}&lng=${lng}`;
        }
        
        fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setInventoryItems(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load generic inventory data", err);
                setLoading(false);
            });
    };

    const getStatusStyle = (status) => {
        if (status === 'In Stock') return { color: 'var(--success-green)' };
        if (status === 'Waiting for Delivery') return { color: '#F59E0B' };
        return { color: 'var(--danger-red)' };
    };

    const getStatusText = (status) => {
        if (status === 'In Stock') return t('pharmacy.inStock');
        if (status === 'Waiting for Delivery') return t('pharmacy.waiting');
        if (status === 'Out of Stock') return t('pharmacy.outOfStock');
        return status;
    };

    const filteredItems = inventoryItems.filter(item => 
        item.medicine_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group items by pharmacy_name natively in the frontend
    const groupedData = filteredItems.reduce((acc, item) => {
        if (!acc[item.pharmacy_name]) {
            acc[item.pharmacy_name] = {
                address: item.address || 'Address not listed',
                distance: item.distance || 'Unknown Distance',
                medicines: []
            };
        }
        acc[item.pharmacy_name].medicines.push(item);
        return acc;
    }, {});

    return (
        <div>
            <h1 className="page-title">{t('pharmacy.title')}</h1>
            
            <div className="input-group" style={{ maxWidth: '600px', marginBottom: '32px' }}>
                <input 
                    type="text" 
                    placeholder={t('pharmacy.searchPlaceholder')} 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ fontSize: '16px', padding: '14px 20px', borderRadius: '30px', width: '100%', boxSizing: 'border-box' }}
                />
            </div>

            {loading ? <p>{t('pharmacy.loading')}</p> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                    {Object.keys(groupedData).length === 0 ? <p style={{ color: 'var(--text-muted)' }}>{t('pharmacy.noMedicines')}</p> : null}
                    
                    {Object.keys(groupedData).map((pharmacyName, index) => {
                        const pharmacy = groupedData[pharmacyName];
                        return (
                            <div key={index} className="card" style={{ marginBottom: 0 }}>
                                <div style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px', marginBottom: '16px' }}>
                                    <h3 style={{ color: 'var(--primary-accent)', marginBottom: 6, fontSize: '22px' }}>
                                        {pharmacyName}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span>📍 {pharmacy.address}</span> 
                                        <span>•</span> 
                                        <span style={{ color: 'var(--success-green)', fontWeight: 'bold' }}>{pharmacy.distance}</span>
                                    </p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {pharmacy.medicines.map(med => (
                                        <div key={med.id} style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--glass-bg)', padding: '12px 16px', borderRadius: '8px', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{med.medicine_name}</span>
                                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{med.dosage || t('pharmacy.standardDosage')}</span>
                                            </div>
                                            <span style={{ fontWeight: '700', fontSize: '12px', ...getStatusStyle(med.status) }}>{getStatusText(med.status)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Pharmacy;
