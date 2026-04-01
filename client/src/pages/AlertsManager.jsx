import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function AlertsManager({ dbData, setDbData }) {
  const activeAlerts = dbData.alerts;

  const handleResolve = (id) => {
    // Globally remove the alert from the main state array so it updates counts everywhere
    setDbData(prev => ({
      ...prev,
      alerts: prev.alerts.filter(a => a.id !== id)
    }));

    toast.success('Threat Neutralized & Removed from DB', {
      style: { background: 'var(--bg-panel)', color: 'var(--accent-green)', border: '1px solid var(--accent-green)' },
      iconTheme: { primary: 'var(--accent-green)', secondary: '#fff' }
    });
  };

  return (
    <>
      <div className="header-top" style={{marginBottom: '24px'}}>
        <div>
          <h2>Active Alert Threat Management</h2>
          <p style={{color: 'var(--text-muted)'}}>Review and functionally neutralize critical system warnings</p>
        </div>
      </div>

      <div className="alerts-list" style={{background: 'transparent', padding: 0}}>
         {activeAlerts.length === 0 ? (
           <h3 style={{color: 'var(--accent-cyan)'}}>✅ All system threats resolved successfully!</h3>
         ) : (
           activeAlerts.map(a => (
            <motion.div 
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={a.id} 
              className={`alert-item ${a.severity.toLowerCase() === 'medium' ? 'medium' : ''}`} 
              style={{background: 'var(--bg-card)', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
            >
              <div>
                <div className="alert-header">
                  <span className="alert-type" style={{color: a.severity === 'Critical' ? '#ef4444' : '#f97316', fontSize: '1.2rem'}}>{a.type}</span>
                </div>
                <p className="alert-msg" style={{fontSize: '1rem', marginTop: '6px'}}>{a.message}</p>
                <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '12px'}}>Coordinates: {a.lat.toFixed(2)}, {a.lng.toFixed(2)}</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleResolve(a.id)}
                style={{
                  background: 'rgba(16, 185, 129, 0.15)', 
                  border: '1px solid var(--accent-green)', 
                  color: 'var(--accent-green)', 
                  padding: '12px 24px', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>
                Mark Resolved
              </motion.button>
            </motion.div>
          ))
         )}
      </div>
    </>
  );
}
