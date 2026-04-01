import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Settings() {
  const [radarVisible, setRadarVisible] = useState(true);
  const [satellitePolling, setSatellitePolling] = useState(true);
  const [nightMode, setNightMode] = useState(true);
  const [gpsActive, setGpsActive] = useState(true);
  const [wasteAlerts, setWasteAlerts] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <div className="header-top wrap-mobile" style={{marginBottom: '24px'}}>
        <div>
          <h2>System Parameters</h2>
          <p style={{color: 'var(--text-muted)'}}>Manage deployment settings and device tracking</p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '32px', borderRadius: '16px' }}>
        
        <div className="settings-group">
          <h3 style={{color: 'var(--accent-blue)', marginBottom: '16px'}}>Display Preferences</h3>
          
          <div className="settings-toggle">
            <div>
              <h4 style={{fontWeight: 500}}>Show Radar Sweep Animation</h4>
              <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Displays the visual scanning effect tracking the map globally.</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={radarVisible} onChange={e => setRadarVisible(e.target.checked)} />
              <div style={{background: radarVisible ? 'var(--accent-blue)' : '#333', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer', transition: '0.3s'}}>
                {radarVisible ? 'ENABLED' : 'DISABLED'}
              </div>
            </label>
          </div>
        </div>

        <div className="settings-group">
          <h3 style={{color: 'var(--accent-orange)', marginBottom: '16px'}}>Live Tracking Operations</h3>
          
          <div className="settings-toggle">
            <div>
              <h4 style={{fontWeight: 500}}>HTML5 Geo-Location</h4>
              <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Allow OceanSync to plot your physical mobile/laptop GPS on the radar.</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={gpsActive} onChange={e => setGpsActive(e.target.checked)} />
              <div style={{background: gpsActive ? 'var(--accent-orange)' : '#333', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer', transition: '0.3s'}}>
                {gpsActive ? 'ENABLED' : 'DISABLED'}
              </div>
            </label>
          </div>

          <div className="settings-toggle">
            <div>
              <h4 style={{fontWeight: 500}}>Autonomous Waste Fleet Extrapolator</h4>
              <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>A.I. automatically routes localized garbage vessels to active microplastic patches.</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={wasteAlerts} onChange={e => setWasteAlerts(e.target.checked)} />
              <div style={{background: wasteAlerts ? 'var(--accent-green)' : '#333', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer', transition: '0.3s'}}>
                {wasteAlerts ? 'ACTIVE' : 'DISABLED'}
              </div>
            </label>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
