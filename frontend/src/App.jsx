import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import SymptomChecker from './pages/SymptomChecker';
import Pharmacy from './pages/Pharmacy';
import Prescriptions from './pages/Prescriptions';
import HealthRecords from './pages/HealthRecords';
import AdminDashboard from './pages/AdminDashboard';
import PharmacyAdmin from './pages/PharmacyAdmin';
import VideoCall from './pages/VideoCall';

function MainLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Determine what links to show based on Role
  const isPatient = user?.role === 'Patient';
  const isDoctor = user?.role === 'Doctor';
  const isAdmin = user?.role === 'Admin';
  const isPharmacy = user?.role === 'Pharmacy';

  return (
    <div className="app-container">
      <nav className="sidebar">
        <h2>HealthPortal</h2>
        
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
        <Link to="/pharmacy" className={location.pathname === '/pharmacy' ? 'active' : ''}>Find Medicines</Link>

        {isPharmacy && <Link to="/inventory" className={location.pathname === '/inventory' ? 'active' : ''}>Manage Inventory</Link>}

        {isPatient && <Link to="/symptom-checker" className={location.pathname === '/symptom-checker' ? 'active' : ''}>Symptom Checker</Link>}
        
        {(isPatient || isDoctor) && (
          <>
            <Link to="/health-records" className={location.pathname === '/health-records' ? 'active' : ''}>Health Records</Link>
            <Link to="/prescriptions" className={location.pathname === '/prescriptions' ? 'active' : ''}>Prescriptions</Link>
            <Link to="/video" className={location.pathname === '/video' ? 'active' : ''}>Video Consult</Link>
          </>
        )}

        {isAdmin && (
          <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Manage Users</Link>
        )}

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: 16 }}>
            <p style={{ fontSize: '14px', marginBottom: 8 }}>{user.name} ({user.role})</p>
            <button onClick={logout} className="btn" style={{ padding: '8px 16px', backgroundColor: 'var(--danger-red)', color: 'white', width: '100%' }}>Logout</button>
        </div>
      </nav>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/symptom-checker" element={<ProtectedRoute allowedRoles={['Patient']}><SymptomChecker /></ProtectedRoute>} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/video" element={<ProtectedRoute allowedRoles={['Patient', 'Doctor']}><VideoCall /></ProtectedRoute>} />
          <Route path="/prescriptions" element={<ProtectedRoute allowedRoles={['Patient', 'Doctor']}><Prescriptions /></ProtectedRoute>} />
          <Route path="/health-records" element={<ProtectedRoute allowedRoles={['Patient', 'Doctor']}><HealthRecords /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['Admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute allowedRoles={['Pharmacy']}><PharmacyAdmin /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* All authenticated dashboard routes go under here */}
        <Route path="/*" element={
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
