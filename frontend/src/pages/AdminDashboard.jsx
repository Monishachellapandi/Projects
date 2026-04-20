import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import DashboardChart from '../components/DashboardChart';

function AdminDashboard() {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [summary, setSummary] = useState({ users: 0, prescriptions: 0, records: 0, pharmacies: 0 });
    const [activityData, setActivityData] = useState([]);
    const [error, setError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, summaryRes, activityRes] = await Promise.all([
                    fetch('http://localhost:5005/api/admin/users', { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch('http://localhost:5005/api/stats/summary', { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch('http://localhost:5005/api/stats/activity', { headers: { 'Authorization': `Bearer ${token}` } })
                ]);
                
                if (!usersRes.ok) throw new Error(t('admin.accessDenied'));
                
                const usersData = await usersRes.json();
                const summaryData = await summaryRes.json();
                const activityJson = await activityRes.json();

                setUsers(usersData);
                setSummary(summaryData);

                // Process activity
                const days = [];
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    days.push(date.toISOString().split('T')[0]);
                }
                const chartData = days.map(day => {
                    const presMatch = activityJson.prescriptions.find(p => p._id === day);
                    const recMatch = activityJson.records.find(r => r._id === day);
                    return {
                        name: day.split('-').slice(1).join('/'),
                        prescriptions: presMatch ? presMatch.count : 0,
                        records: recMatch ? recMatch.count : 0
                    };
                });
                setActivityData(chartData);

            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, [token, t]);

    const metrics = [
        { label: t('admin.totalUsers'), val: summary.users, color: '#8b5cf6' },
        { label: t('admin.totalPrescriptions'), val: summary.prescriptions, color: '#3b82f6' },
        { label: t('admin.healthRecords'), val: summary.healthRecords || t('health.dbRecords'), color: '#10b981' },
        { label: m => m === 'REGISTERED PHARMACIES' ? t('admin.pharmacies') : t('stats.pharmacies'), val: summary.pharmacies, color: '#ec4899' }
    ];

    // Fixed metrics mapping to be more robust
    const displayMetrics = [
        { label: t('admin.totalUsers'), val: summary.users, color: '#8b5cf6' },
        { label: t('admin.totalPrescriptions'), val: summary.prescriptions, color: '#3b82f6' },
        { label: t('admin.healthRecords'), val: summary.records, color: '#10b981' },
        { label: t('admin.pharmacies'), val: summary.pharmacies, color: '#ec4899' }
    ];

    return (
        <div>
            <h1 className="page-title">{t('admin.title')}</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>{t('admin.desc')}</p>
            
            {error && <div className="alert-warning" style={{ marginBottom: 24 }}>{error}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {displayMetrics.map((m, i) => (
                    <div key={i} className="card" style={{ padding: '20px', textAlign: 'center', borderTop: `4px solid ${m.color}` }}>
                        <h2 style={{ fontSize: '28px', margin: 0 }}>{m.val}</h2>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 4 }}>{m.label}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
                <div className="card" style={{ padding: '24px' }}>
                    <h3 style={{ marginBottom: 20 }}>{t('admin.activityTrend')}</h3>
                    <DashboardChart data={activityData} />
                </div>

                <div className="card" style={{ padding: '24px' }}>
                    <h3 style={{ marginBottom: 20 }}>{t('admin.userList')} ({users.length})</h3>
                    <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
                        {users.map(u => (
                            <div key={u.id} style={{ padding: '12px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{u.name}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.email}</div>
                                </div>
                                <span style={{ fontSize: '10px', fontWeight: 'bold', background: 'var(--glass-bg)', padding: '2px 8px', borderRadius: '10px', color: 'var(--primary-accent)' }}>
                                    {u.role.toUpperCase()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
