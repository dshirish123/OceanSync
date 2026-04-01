import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { Activity, Waves, Ship, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Node Icons
const darkVesselIcon = new L.DivIcon({ className: 'dark-vessel', html: `<div style="background: #ef4444; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>`, iconSize: [14, 14], iconAnchor: [7, 7] });
const vesselIcon = new L.DivIcon({ html: `<div style="background: #0ea5e9; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`, iconSize: [12, 12], iconAnchor: [6, 6] });
const wasteCollectorIcon = new L.DivIcon({ html: `<div style="background: #10b981; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 15px rgba(16,185,129,0.8);"></div>`, iconSize: [16, 16], iconAnchor: [8, 8] });
const userLocationIcon = new L.DivIcon({ html: `<div style="background: #f97316; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; animation: pulse 2s infinite;"></div>`, iconSize: [16, 16], iconAnchor: [8, 8] });

export default function Dashboard({ dbData, setDbData }) {
  const { dataPoints, alerts, vessels } = dbData;
  const darkVessels = vessels.filter(v => v.isDark);
  const wasteCollectors = vessels.filter(v => v.type === "Waste Collection");
  const regularVessels = vessels.filter(v => !v.isDark && v.type !== "Waste Collection");
  
  const [userPos, setUserPos] = useState(null);

  // 1. Mobile & Web HTML5 Geolocation Tracking
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserPos({ lat: position.coords.latitude, lng: position.coords.longitude });
        toast.success('Field Agent GPS Locked', { icon: '🛰️', style: {background: 'var(--bg-panel)', color: 'var(--accent-orange)', border: '1px solid var(--accent-orange)'}});
      }, (error) => {
        console.warn("GPS Tracking blocked or unavailable.", error);
      });
    }
  }, []);

  // 2. Automated Waste Collection Proximity Routing AI
  useEffect(() => {
    const timer = setTimeout(() => {
      if(wasteCollectors.length > 0 && dataPoints.length > 0) {
        // Find highest pollution anomaly
        const targetPatch = [...dataPoints].sort((a,b) => b.pollutionLevel - a.pollutionLevel)[0];
        toast(`AI ROUTING: Waste Fleet dispatched to Microplastic Anomaly [${targetPatch.lat.toFixed(1)}, ${targetPatch.lng.toFixed(1)}]`, {
          icon: '♻️', duration: 7000, style: { background: 'var(--bg-panel)', color: 'var(--accent-green)', border: '1px solid var(--accent-green)' }
        });
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [wasteCollectors, dataPoints]);

  // 3. Satellite Polling Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newPoint = { 
          lat: (Math.random() * 100) - 50, lng: (Math.random() * 180) - 90, 
          pollutionLevel: Math.random(), 
          surfaceTemp: 25 + Math.random() * 8, deepTemp: 2 + Math.random() * 3, pressure: 4000 + Math.random() * 1000 
        };
        setDbData(prev => ({ ...prev, dataPoints: [...prev.dataPoints, newPoint] }));
        toast('📡 Satellite Update: New Data Synced', { style: { background: 'var(--bg-panel)', color: 'var(--accent-blue)', border: '1px solid var(--accent-blue)' } });
      }
    }, 8000); 
    return () => clearInterval(interval);
  }, [setDbData]);

  // Physics Maths
  const avgSst = (dataPoints.reduce((acc, curr) => acc + curr.surfaceTemp, 0) / dataPoints.length).toFixed(1);
  const avgBenthic = (dataPoints.reduce((acc, curr) => acc + curr.deepTemp, 0) / dataPoints.length).toFixed(1);

  return (
    <>
      <div className="header-top wrap-mobile">
        <div>
          <h2>Orbital Tracking Array</h2>
          <p style={{color: 'var(--text-muted)'}}>Global satellite synchronization & waste dispatch network</p>
        </div>
        <div className="status-badge success mobile-mt" style={{margin: 0, padding: '8px 16px', background: 'var(--bg-card)'}}>
           <span className="pulse-dot"></span> SECURE FEED
        </div>
      </div>

      <div className="stats-grid">
        <motion.div whileHover={{ scale: 1.05 }} className="stat-card glass-panel physics-card">
          <div className="stat-icon" style={{color: 'var(--accent-blue)', background: 'rgba(14, 165, 233, 0.1)'}}><Activity size={24}/></div>
          <div className="stat-info">
            <h3>Sea Surface Temp</h3>
            <p>{avgSst}°C</p>
            <span style={{fontSize: '0.75rem', color: 'var(--accent-cyan)'}}>Benthic Core: {avgBenthic}°C</span>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="stat-card glass-panel">
          <div className="stat-icon" style={{color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)'}}><Waves size={24}/></div>
          <div className="stat-info">
            <h3>Active Sensors</h3>
            <p>{dataPoints.length}</p>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="stat-card glass-panel">
          <div className="stat-icon" style={{color: 'var(--accent-orange)', background: 'rgba(249, 115, 22, 0.1)'}}><Ship size={24}/></div>
          <div className="stat-info">
            <h3>Tracked Fleet</h3>
            <p>{vessels.length}</p>
            <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Waste Collectors Active</span>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="stat-card glass-panel" style={{ borderColor: alerts.length > 0 ? 'rgba(239, 68, 68, 0.3)' : '' }}>
          <div className="stat-icon" style={{color: 'var(--accent-red)', background: 'rgba(239, 68, 68, 0.1)'}}><AlertTriangle size={24}/></div>
          <div className="stat-info">
            <h3>Critical Threats</h3>
            <p style={{color: 'var(--accent-red)'}}>{alerts.length}</p>
          </div>
        </motion.div>
      </div>

      <div className="dashboard-body">
        <div className="map-container glass-panel">
          <div className="radar-sweep"></div>
          
          <div className="panel-header" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(13, 22, 39, 0.8)', backdropFilter: 'blur(5px)' }}>
            <h3 style={{ textShadow: '0 0 10px rgba(14,165,233,0.5)' }}>Geospatial Link</h3>
            <div className="map-legends">
              <span className="legend-badge red">🔴 Rogue Arrays</span>
              <span className="legend-badge blue">🔵 Local Craft</span>
              <span className="legend-badge green">♻️ Waste Extractors</span>
              {userPos && <span className="legend-badge orange">📡 You (GPS)</span>}
            </div>
          </div>
          
          <div style={{flexGrow: 1, marginTop: '60px'}}>
            <MapContainer center={[10.0, -40.0]} zoom={3} style={{ height: '100%', width: '100%', background: 'var(--bg-dark)' }} maxBounds={[[-90,-180],[90,180]]}>
              <TileLayer noWrap={true} url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
              
              {/* User Field GPS Marker */}
              {userPos && (
                <Marker position={[userPos.lat, userPos.lng]} icon={userLocationIcon}>
                  <Popup><strong style={{color: 'var(--accent-orange)'}}>Your GPS Terminal</strong><br/>Live coordinate tracking enabled.</Popup>
                </Marker>
              )}

              {/* Vessels */}
              {regularVessels.map(v => (
                <Marker key={v.id} position={[v.lat, v.lng]} icon={vesselIcon}>
                  <Popup><strong style={{color: 'var(--accent-blue)'}}>{v.name}</strong><br/><span style={{color:'#666'}}>{v.type} ({v.speed}kn)</span></Popup>
                </Marker>
              ))}
              {darkVessels.map(v => (
                <Marker key={v.id} position={[v.lat, v.lng]} icon={darkVesselIcon} />
              ))}
              {wasteCollectors.map(v => (
                <Marker key={v.id} position={[v.lat, v.lng]} icon={wasteCollectorIcon}>
                   <Popup><strong style={{color: 'var(--accent-green)'}}>{v.name}</strong><br/>Autonomous Waste Extractor Unit</Popup>
                </Marker>
              ))}
              
              {/* Sensors (Patch/Hydro) */}
              {dataPoints.map((dp, i) => (
                <CircleMarker 
                  key={i} center={[dp.lat, dp.lng]} radius={dp.pollutionLevel * 30}
                  pathOptions={{ color: dp.pollutionLevel > 0.6 ? '#ef4444' : '#0ea5e9', fillColor: dp.pollutionLevel > 0.6 ? '#ef4444' : '#0ea5e9', fillOpacity: 0.3 }}
                >
                  <Popup>
                    <strong>Sensor Buoy #{i}</strong><br/>
                    SST: {dp.surfaceTemp.toFixed(1)}°C<br/>
                    Benthic: {dp.deepTemp.toFixed(1)}°C<br/>
                    Pressure: {dp.pressure.toFixed(0)} dbar
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="alerts-panel glass-panel">
          <div className="panel-header">
            <h3>Live Intercepts</h3>
          </div>
          <div className="alerts-list">
            {alerts.slice(0, 5).map((a, index) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                key={a.id} className={`alert-item ${a.severity.toLowerCase() === 'medium' ? 'medium' : ''}`}
              >
                <div className="alert-header">
                  <span className="alert-type" style={{color: a.severity === 'Critical' ? '#ef4444' : '#f97316' }}>{a.type}</span>
                  <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>T-00:00</span>
                </div>
                <p className="alert-msg">{a.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
