import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { Waves, Ship, AlertTriangle, Activity, Map as MapIcon, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import AlertsManager from './pages/AlertsManager';
import Login from './pages/Login';
import Settings from './pages/Settings';
import './index.css';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, scale: 1.02, filter: 'blur(5px)' }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
  >
    {children}
  </motion.div>
);

function Layout({ dbData, setDbData, loading, setAuth }) {
  const location = useLocation();

  const handleLogout = () => {
    toast('Satellite Uplink Terminated.', { icon: '🔒', style: { borderRadius: '10px', background: '#333', color: '#fff' }});
    setAuth(false);
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar glass-panel" style={{ borderTop: 'none', borderBottom: 'none', borderLeft: 'none', zIndex: 50 }}>
        <div className="brand">
          <div className="brand-icon"><Waves size={24} color="#fff" strokeWidth={2.5}/></div>
          <h1>OceanSync</h1>
        </div>
        
        <nav className="nav-menu">
          <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}><MapIcon size={20} /> Satellite Radar</Link>
          <Link to="/analytics" className={`nav-item ${location.pathname === '/analytics' ? 'active' : ''}`}><Activity size={20} /> Telemetry Link</Link>
          <Link to="/alerts" className={`nav-item ${location.pathname === '/alerts' ? 'active' : ''}`}><AlertTriangle size={20} /> Threat Manager</Link>
          <div style={{flexGrow: 1}}></div>
          <Link to="/settings" className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}><SettingsIcon size={20} /> System Config</Link>
          <div className="nav-item" onClick={handleLogout} style={{ color: 'var(--accent-red)', marginTop: '8px' }}><LogOut size={20} /> Terminate Link</div>
        </nav>
      </aside>

      <main className="main-content">
        {loading || !dbData ? (
          <div className="login-container" style={{ background: 'transparent', height: '100%' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
              <Waves size={64} color="var(--accent-blue)" />
            </motion.div>
            <p style={{color: 'var(--accent-cyan)', marginTop: '24px', letterSpacing: '2px', fontSize: '1.2rem'}}>ESTABLISHING SECURE CONNECTION...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
               <Route index element={<PageWrapper><Dashboard dbData={dbData} setDbData={setDbData} /></PageWrapper>} />
               <Route path="analytics" element={<PageWrapper><Analytics dbData={dbData} /></PageWrapper>} />
               <Route path="alerts" element={<PageWrapper><AlertsManager dbData={dbData} setDbData={setDbData} /></PageWrapper>} />
               <Route path="settings" element={<PageWrapper><Settings /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dbData, setDbData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!isAuthenticated) return;
    
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/test');
        setDbData(res.data.data);
        toast.success('Radar Uplink Established', {
          style: { borderRadius: '10px', background: 'var(--bg-panel)', color: '#fff', border: '1px solid var(--accent-cyan)' },
          iconTheme: { primary: 'var(--accent-cyan)', secondary: '#fff' }
        });
      } catch (err) {
        console.error("Failed API fetch", err);
        toast.error('Uplink Failed. Check Signal.', { style: { background: '#ef4444', color: '#fff'} });
      } finally {
        setLoading(false);
      }
    };
    
    // Fake a 1.5s delay to show the awesome connection animation
    setTimeout(fetchData, 1500);
    
  }, [isAuthenticated]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <BrowserRouter>
        {!isAuthenticated ? (
           <Routes>
             <Route path="*" element={<Login setAuth={setIsAuthenticated} />} />
           </Routes>
        ) : (
          <Layout dbData={dbData} setDbData={setDbData} loading={loading} setAuth={setIsAuthenticated} />
        )}
      </BrowserRouter>
    </>
  );
}
