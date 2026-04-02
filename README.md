# OceanSync: Satellite Resource & Vendor Dispatch Platform

OceanSync is an enterprise-grade, full-stack logistics platform designed for ocean sustainability. It uses simulated satellite data to detect marine materials (plastics, scrap, nets) and allows coordinators to seamlessly dispatch local vendors for cleanup.

## 💼 The Business Value (Presentation Pitch)
**Creating Employment, Eliminating Capital Expenditure.**
Traditionally, ocean cleanup requires investing millions in heavy physical ships and equipment. OceanSync solves this by operating entirely as an **asset-light intelligence layer**. 
We use satellite uplinks to identify material deposits and assign the collection jobs to local maritime vendors. This creates local employment while keeping overhead near zero.

## 🎓 Professor Presentation Mode
**Key Technical Highlights to Demonstrate:**
- **Full-Stack Logic:** Every dashboard stat is fetched from a Node.js/Express REST API.
- **Data Persistence:** Vendor dispatch jobs and credits are saved to a persistent JSON-file database.
- **Secure Auth:** JWT-based session management with encrypted password storage (Bcrypt).
- **Interactive Radar & Satellite GPS:** Real-time Leaflet integration. **Type a GPS coordinate and see the satellite scan the grid.**
- **Executive Archival:** Client-side PDF generation using `jsPDF` for secure technical briefs.

---

## 🚀 Quick Start (Local Launch)

### 1. Backend Setup
Navigate to the `server` directory and install dependencies:
```powershell
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
- **Database**: LowDB-style JSON persistence (`data/db.json`)
- **Authentication**: JWT (JSON Web Tokens) with Bcrypt password hashing
- **Frontend**: Vanilla JS, HTML5, CSS3 (Glassmorphism Eco-Teal design)
- **Mapping**: Leaflet.js
- **Charts**: Chart.js
- **Reports**: jsPDF for on-the-fly PDF generation

## 💎 Key Features

- **Overview Radar**: Live tracking of marine vessels. Includes a **Satellite GPS Scanner** to detect materials based on coordinate input.
- **Vendor Dispatch Matrix**: Real-time listing of material deposits. Dispatch vendors to resolve them and earn eco-credits.
- **Telemetry Data**: Visualization of Sea Surface Temperature (SST), pressure, and microplastic density.
- **Export Hub**:
  - **Generate PDF**: Creates an executive brief with current system stats.
  - **Export JSON**: Downloads a raw telemetry dump for external AI processing.
- **System Config**: Advanced toggles for routing, acoustic masking, and drone deployments.

## 🔡 Cloud Transition (Render.com ready)
I've already prepared this project for a permanent Cloud deployment:
- [**`server/models.js`**](file:///c:/Users/shiri/OneDrive/Desktop/newproj/server/models.js): Mongoose schemas are defined.
- [**`render.yaml`**](file:///c:/Users/shiri/OneDrive/Desktop/newproj/render.yaml): Blueprint for one-click launch on Render.
- [**`server/migrate.js`**](file:///c:/Users/shiri/OneDrive/Desktop/newproj/server/migrate.js): Script to lift local data to MongoDB Atlas.

---
*Developed for Sustainable Marine Logistics.*
