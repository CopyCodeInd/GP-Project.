# Gram Panchayat Planning Platform (GPDP)

> **Integrated Rural Planning, Scheme Correlation, SVAMITVA Digital Twin & Citizen Service Platform**  
> Aligned with Ministry of Panchayati Raj, Government of India & Panchayat Advancement Index (PAI 2.0).

---

## 🌐 Live Demo & Instant Access

If you are viewing this repository on GitHub, **GitHub does not run web servers directly by default**. You can view and use the live working application directly here:

- **Live Hosted Application**: [Open Live App](https://ais-pre-7uvxsmaoqmx3ruxaryqzjr-72865473057.asia-southeast1.run.app)
- **Development Preview**: [Open Dev Preview](https://ais-dev-7uvxsmaoqmx3ruxaryqzjr-72865473057.asia-southeast1.run.app)

---

## 🚀 How to Run Locally on Your Computer

If you cloned or downloaded this repository to your laptop/PC:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or higher installed)

### 2. Steps to Run

```bash
# 1. Open your terminal in this project folder and install dependencies:
npm install

# 2. (Optional) Create .env file for Gemini AI classification:
cp .env.example .env
# Add your GEMINI_API_KEY if available (the app also has built-in smart offline fallbacks)

# 3. Start the application:
npm run dev
```

Now open your browser and go to:
👉 **`http://localhost:3000`**

---

## ☁️ How to Deploy Online for Free (1-Click)

If you want your GitHub repo to have its own public `.vercel.app` or `.onrender.com` link:

### Option A: Vercel (Fastest for Frontend)
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New"** > **"Project"** and select this repository.
3. Keep default settings (Vite) and click **"Deploy"**.

### Option B: Render / Railway (For Full Express Backend)
1. Go to [render.com](https://render.com).
2. Click **"New Web Service"** and select this GitHub repository.
3. Build Command: `npm run build`
4. Start Command: `npm start`

---

## 📌 Core Modules Included

1. **Screen 1 · PM–GP Consultation:** Virtual Gram Sabha call, speaker turns, live requirement drawer.
2. **Screen 2 · Scheme Correlation:** 4-tier financial tracking (JJM, PMGSY, SBM-G, 15th FC, MGNREGS).
3. **Screen 3 · SVAMITVA Digital Twin:** 2D/3D cadastral GIS, rooftop solar feasibility under PM Surya Ghar.
4. **Screen 4 · Citizen Requests:** AI speech & text recognition, DGPS pin-drop, duplicate alerts.
5. **Screen 5 · Rainwater Opportunity Map:** Hydrological DEM ridge-to-valley catchment analysis.
6. **Screen 6 · All-GP Agenda Review:** AI duplicate funding checks, statutory officer decisions, sustainable O&M.
7. **Screen 7 · My Eligible Schemes:** Personalized scheme matching, required documents checklist, grievance tracking.
8. **GPDP Resolution Export:** Official e-GramSwaraj / PAI 2.0 resolution generator with printable format.
