import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Patient' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:5005/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');
            alert('Registration successful! Redirecting to login...');
            window.location.href = '/login';
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto' }}>
            <h1 className="page-title" style={{ textAlign: 'center' }}>Create Account</h1>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" required onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" required onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" required onChange={e => setForm({...form, password: e.target.value})} />
                    </div>
                    <div className="input-group">
                        <label>Account Role</label>
                        <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                            <option value="Patient">Patient</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Pharmacy">Pharmacy Provider</option>
                            <option value="Admin">System Admin</option>
                        </select>
                    </div>
                    {error && <p style={{ color: 'var(--danger-red)', marginBottom: 12 }}>{error}</p>}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>Register</button>
                </form>
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)' }}>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
