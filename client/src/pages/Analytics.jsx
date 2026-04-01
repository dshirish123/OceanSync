import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts';

export default function Analytics({ dbData }) {
  
  // Transform our mock GPS datapoints into physics chartable sequences
  const chartData = dbData.dataPoints.map((dp, i) => ({
    name: `Buoy 0${i+1}`,
    surfaceTemp: dp.surfaceTemp,
    benthicTemp: dp.deepTemp,
    pressure: dp.pressure,
    pollution: dp.pollutionLevel * 100 // Convert to percentage
  }));

  return (
    <>
      <div className="header-top wrap-mobile" style={{marginBottom: '24px'}}>
        <div>
          <h2>Telemetry Analytics</h2>
          <p style={{color: 'var(--text-muted)'}}>Deep ocean physics & microplastic density evaluation</p>
        </div>
      </div>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
        
        {/* PHYSICS CHART - Surface vs Deep Temp */}
        <div className="stat-card glass-panel" style={{display: 'block', padding: '30px', width: '100%'}}>
          <h3 style={{marginBottom: '8px', color: 'var(--accent-blue)'}}>Thermal Stratification (SST vs Benthic Temperature)</h3>
          <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px'}}>Demonstrating extreme temperature drops caused by hydrostatic pressure at deep-sea cores.</p>
          <div style={{height: 300, width: '100%'}}>
            <ResponsiveContainer>
              <AreaChart data={chartData}>
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" tickFormatter={(t) => `${t}°C`} />
                <RechartsTooltip contentStyle={{backgroundColor: 'var(--bg-panel)', border: 'none', borderRadius: '8px', color: '#fff'}} />
                <Area type="monotone" name="Surface (SST)" dataKey="surfaceTemp" stroke="var(--accent-cyan)" fill="rgba(6, 182, 212, 0.4)" />
                <Area type="monotone" name="Benthic (Deep)" dataKey="benthicTemp" stroke="var(--accent-blue)" fill="rgba(14, 165, 233, 0.6)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px'}}>
          {/* PRESSURE CHART */}
          <div className="stat-card glass-panel" style={{display: 'block', padding: '30px'}}>
            <h3 style={{marginBottom: '20px', color: '#8b5cf6'}}>Hydrostatic Pressure Readings</h3>
            <div style={{height: 250, width: '100%'}}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" tickFormatter={(t) => `${t}db`} />
                  <RechartsTooltip contentStyle={{backgroundColor: 'var(--bg-panel)', border: 'none', borderRadius: '8px', color: '#fff'}} />
                  <Line type="monotone" name="Pressure (dbar)" dataKey="pressure" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* POLLUTION ACCUMULATION */}
          <div className="stat-card glass-panel" style={{display: 'block', padding: '30px'}}>
            <h3 style={{marginBottom: '20px', color: 'var(--accent-red)'}}>Microplastic Density Matrix (%)</h3>
            <div style={{height: 250, width: '100%'}}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" />
                  <RechartsTooltip contentStyle={{backgroundColor: 'var(--bg-panel)', border: 'none', borderRadius: '8px', color: '#fff'}} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                  <Bar name="Pollution Risk" dataKey="pollution" fill="var(--accent-orange)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
