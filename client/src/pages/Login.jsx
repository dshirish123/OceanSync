import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Waves, Key, LogIn } from 'lucide-react';

export default function Login({ setAuth }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate secure login handshake
    if(username && password) {
      setAuth(true);
    }
  };

  return (
    <div className="login-container">
      {/* Background Animated Particles Overlay */}
      <motion.div 
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.1), transparent 60%)' }}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="login-box glass-panel"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="brand-icon" style={{ margin: '0 auto 24px auto', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Waves size={36} color="#fff" />
        </motion.div>
        
        <h2 style={{ marginBottom: '8px', fontSize: '1.8rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>OceanSync Gateway</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '0.9rem' }}>Secure Marine Telemetry Access</p>
        
        <form onSubmit={handleLogin}>
          <div style={{ position: 'relative' }}>
            <input 
              className="login-input" 
              type="text" 
              placeholder="Operator ID" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
            <div style={{ position: 'absolute', left: '12px', top: '20px', color: 'var(--text-muted)' }}><LogIn size={18} /></div>
          </div>
          <div style={{ position: 'relative' }}>
            <input 
              className="login-input" 
              type="password" 
              placeholder="Access Clearance" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
            <div style={{ position: 'absolute', left: '12px', top: '20px', color: 'var(--text-muted)' }}><Key size={18} /></div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="login-btn"
            type="submit"
          >
            INITIALIZE UPLINK
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
