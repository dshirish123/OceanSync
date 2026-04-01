# OceanSync: Marine Intelligence Platform

OceanSync is an enterprise-grade, full-stack marine monitoring dashboard designed for high-stakes maritime operators. It features real-time telemetry, threat detection, and secure archival capabilities.

## 🎓 Professor Presentation Mode
**Key Technical Highlights to Demonstrate:**
- **Full-Stack Logic:** Every dashboard stat is fetched from a Node.js/Express REST API.
- **Data Persistence:** Threat resolutions and credits are saved to a persistent JSON-file database (LowDB style).
- **Secure Auth:** JWT-based session management with encrypted password storage (Bcrypt).
- **Interactive Radar:** Real-time Leaflet integration with custom GPS uplink modules.
- **Executive Archival:** Client-side PDF generation using `jsPDF` for secure technical briefs.

---

## 🚀 Quick Start (Local Launch)

### 1. Backend Setup
Navigate to the `server` directory and install dependencies:
```powershell
cd server
npm install
```

### 2. Launch the Platform
Start the Node.js server:
```powershell
node server.js
```
The application will be accessible at: **`http://localhost:5000`**

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: LowDB-style JSON persistence (`server/data/db.json`)
- **Authentication**: JWT (JSON Web Tokens) with Bcrypt password hashing
- **Frontend**: Vanilla JS, HTML5, CSS3 (Glassmorphism design)
- **Mapping**: Leaflet.js
- **Charts**: Chart.js
- **Reports**: jsPDF for on-the-fly PDF generation

## 💎 Key Features

- **Overview Radar**: Live tracking of marine vessels and environmental anomalies. Includes a **Live GPS Uplink** to plot your exact coordinates.
- **Threat Matrix**: Real-time listing of maritime threats. Resolve them to earn system credits.
- **Telemetry Data**: Visualization of Sea Surface Temperature (SST), pressure, and microplastic density.
- **Export Hub**:
  - **Generate PDF**: Creates a "TOP SECRET" executive brief with current system stats.
  - **Export JSON**: Downloads a raw telemetry dump for external AI processing.
- **System Config**: Advanced toggles for satellite scanning, acoustic scramblers, and drone deployments.
- **Notification System**: A sliding alert panel for critical system updates.

## 🔡 Cloud Transition (Render.com ready)
I've already prepared this project for a permanent Cloud deployment:
- [**`server/models.js`**](file:///c:/Users/shiri/OneDrive/Desktop/newproj/server/models.js): Mongoose schemas are defined.
- [**`render.yaml`**](file:///c:/Users/shiri/OneDrive/Desktop/newproj/render.yaml): Blueprint for one-click launch on Render.
- [**`server/migrate.js`**](file:///c:/Users/shiri/OneDrive/Desktop/newproj/server/migrate.js): Script to lift local data to MongoDB Atlas.

---
*Developed for Advanced Marine Operations.*
