import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:5005/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (res.status === 404 && data.error === 'USER_NOT_FOUND') {
                setError('User not found. Redirecting to registration...');
                setTimeout(() => window.location.href = '/register', 2000);
                return;
            }

            if (!res.ok) throw new Error(data.error || 'Login failed');
            
            login(data.token, data.user);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '60px auto' }}>
            <h1 className="page-title" style={{ textAlign: 'center' }}>Sign In</h1>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" required onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" required onChange={e => setPassword(e.target.value)} />
                    </div>
                    {error && <p style={{ color: 'var(--danger-red)', marginBottom: 12 }}>{error}</p>}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
                </form>
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)' }}>Don't have an account? <Link to="/register">Register here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
