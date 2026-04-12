import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Prescriptions() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token, user } = useAuth();

    // Doctor Form State
    const [form, setForm] = useState({ patient_id: '', medicines: '', dosage: '' });

    const fetchPrescriptions = () => {
        fetch('http://localhost:5005/api/prescriptions', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            setPrescriptions(data);
            setLoading(false);
        })
        .catch(err => {
            setError('Failed to load prescriptions from database.');
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchPrescriptions();
    }, [token]);

    const handleCreatePrescription = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5005/api/prescriptions', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error('Failed to create prescription');
            setForm({ patient_id: '', medicines: '', dosage: '' });
            fetchPrescriptions(); // Refresh list
        } catch(err) {
            alert(err.message);
        }
    };

    const downloadPDF = (id) => {
        alert(`Generating PDF for prescription #${id}. \n(Requires backend PDF stream setup)`);
    };

    const isDoctor = user?.role === 'Doctor';

    return (
        <div>
            <h1 className="page-title">{isDoctor ? 'Issue & View Prescriptions' : 'My Prescriptions'}</h1>
            
            {error && <div className="alert-warning" style={{ backgroundColor: '#FEF2F2', color: 'var(--danger-red)' }}>{error}</div>}

            {isDoctor && (
                <div className="card" style={{ backgroundColor: '#F0FDF4' }}>
                    <h3 style={{ marginBottom: 16 }}>Issue New Prescription</h3>
                    <form onSubmit={handleCreatePrescription} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className="input-group">
                            <label>Patient ID</label>
                            <input type="number" required value={form.patient_id} onChange={e => setForm({...form, patient_id: e.target.value})} />
                        </div>
                        <div className="input-group">
                            <label>Medicines</label>
                            <textarea required value={form.medicines} onChange={e => setForm({...form, medicines: e.target.value})}></textarea>
                        </div>
                        <div className="input-group">
                            <label>Dosage</label>
                            <input type="text" required value={form.dosage} onChange={e => setForm({...form, dosage: e.target.value})} />
                        </div>
                        <button type="submit" className="btn btn-success" style={{ width: '200px' }}>Submit Prescription</button>
                    </form>
                </div>
            )}

            <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid var(--border-color)' }} />

            {loading ? <p>Loading prescriptions...</p> : prescriptions.length === 0 ? <p>No prescriptions found in the database.</p> : (
                prescriptions.map(presc => (
                    <div key={presc.id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ color: 'var(--primary-blue)' }}>Prescription by {presc.doctor_name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: 16 }}>Date Added: {presc.date}</p>
                                
                                {isDoctor && <p style={{ marginBottom: 8, fontWeight: 'bold' }}>For Patient ID: {presc.patient_id}</p>}

                                <h4 style={{ marginBottom: 4 }}>Medicines</h4>
                                <p style={{ marginBottom: 12 }}>{presc.medicines}</p>
                                
                                <h4 style={{ marginBottom: 4 }}>Dosage Instructions</h4>
                                <p>{presc.dosage}</p>
                            </div>
                            <button className="btn btn-primary" onClick={() => downloadPDF(presc.id)}>
                                Download PDF
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Prescriptions;
