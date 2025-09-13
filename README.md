# Real-time WiFi Sensing and Yoga Activity Recognition

A React-based frontend system for visualizing **52-channel Wi-Fi CSI (Channel State Information) signals** in real time and synchronizing them with yoga activity videos. The app parses raw CSV sensor data, processes it in a sliding window, and maps activities to videos for activity recognition research.

---

## 🚀 Features
- 📂 **CSV Upload & Parsing** – Uses **PapaParse** to parse large Wi-Fi CSI CSV files efficiently (streaming + worker threads).  
- 📊 **Real-time Visualization** – Displays 52-channel signals with **Chart.js** (via `react-chartjs-2`).  
- 🪄 **Sliding Window (N=50)** – Maintains only the latest 50 data points → prevents memory bloat and ensures smooth charts.  
- 🎥 **Activity Mapping** – Last column in CSV is the activity label → maps to synchronized yoga videos.  
- ⚡ **Performance Optimizations** – Data validation, async parsing, and React hooks (`useState`, `useEffect`, `useMemo`) to reduce re-renders.  

---

## 🛠️ Tech Stack
- **React.js** – UI framework  
- **PapaParse** – CSV parsing in-browser  
- **Chart.js + react-chartjs-2** – Real-time line charts  
- **React Hooks** – `useState`, `useEffect`, `useRef`, `useMemo`  

---

## 📂 Workflow
1. **Upload CSV** → Parse rows with PapaParse (53 columns: 52 channels + 1 activity label).  
2. **Validate Data** → Keep only rows with exactly 53 numeric values.  
3. **Update State in Real Time** → Add new values every 50ms (20Hz), keep last 50 points.  
4. **Chart Update** → Render smooth scrolling graph for 52 channels.  
5. **Activity Mapping** → Switch synchronized yoga activity video based on label.  

---


## ✅ Summary
This project demonstrates **real-time data visualization**, **signal processing**, and **human activity recognition** concepts using React. It is optimized for handling **high-frequency, multi-channel Wi-Fi CSI signals** while staying responsive in the browser.

---
