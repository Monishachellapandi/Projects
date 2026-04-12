import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function HealthRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, user } = useAuth();
    
    // Doctor Upload State
    const [form, setForm] = useState({ patient_id: '', details: '' });

    const fetchRecords = () => {
        fetch('http://localhost:5005/api/health-records', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            setRecords(data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchRecords();
    }, [token]);

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5005/api/health-records', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error('Upload failed');
            setForm({ patient_id: '', details: '' });
            fetchRecords();
        } catch(err) {
            alert(err.message);
        }
    };

    const isDoctor = user?.role === 'Doctor';

    return (
        <div>
            <h1 className="page-title">Health Records Dashboard</h1>
            
            {(isDoctor || user?.role === 'Patient') && (
                <div className="card" style={{ backgroundColor: '#F9FAFB' }}>
                    <h3 style={{ marginBottom: '16px' }}>Upload New Record</h3>
                    <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {isDoctor && (
                            <div className="input-group">
                                <label>Patient ID</label>
                                <input type="number" required value={form.patient_id} onChange={e => setForm({...form, patient_id: e.target.value})} />
                            </div>
                        )}
                        <div className="input-group">
                            <label>Record Details (Description)</label>
                            <input type="text" required value={form.details} onChange={e => setForm({...form, details: e.target.value})} />
                        </div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <input type="file" accept=".pdf,image/*" style={{ flex: 1, backgroundColor: 'white' }} />
                            <button type="submit" className="btn btn-success">Upload File</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ marginTop: '32px' }}>
                <h3 style={{ marginBottom: '16px' }}>Database Records</h3>
                {loading ? <p>Loading database...</p> : records.length === 0 ? <p>No records found in database.</p> : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {records.map(record => (
                            <div key={record.id} className="card" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ color: 'var(--primary-blue)' }}>{record.details}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: 4 }}>Date: {record.created_at}</p>
                                    {isDoctor && <p style={{ fontSize: '14px', color: '#1F2937', marginTop: 4 }}>For Patient ID: {record.patient_id}</p>}
                                </div>
                                <span style={{ padding: '4px 12px', border: '1px solid var(--success-green)', color: 'var(--success-green)', borderRadius: '16px', fontSize: '13px', fontWeight: '600' }}>
                                    {record.status || 'Verified'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HealthRecords;
