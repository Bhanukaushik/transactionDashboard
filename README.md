# 🛍️ MERN Transaction Dashboard

A **full-stack transaction dashboard** built with **React, Node.js, Express, PostgreSQL, and Bootstrap**.  
It allows users to **view transactions, search, filter by month, and visualize data** using charts.  

## 🚀 Features
✅ **Month Selection** – Filter transactions by month  
✅ **Search Transactions** – Quickly find specific transactions  
✅ **Statistics Overview** – View total sales, sold & unsold items  
✅ **Bar & Pie Charts** – Visualize transaction data  
✅ **Fully Responsive** – Built with Bootstrap for mobile-friendly UI  
---

## 🏗️ Tech Stack
- **Frontend:** React, Vite, Axios, Chart.js, Bootstrap  
- **Backend:** Node.js, Express, PostgreSQL  
- **Database:** Serverless PostgreSQL (Neon.tech)  
- **Deployment:** Vercel  

---


## 📂 Project Structure
```
/mern-transaction-dashboard
│── /backend      # Node.js + Express backend
│── /frontend     # React + Vite frontend
│── .gitignore
│── README.md
│── package.json
```

---

## ⚡ Getting Started

### 🛠️ 1. Clone the Repository
```sh
git clone https://github.com/Bhanukaushik/transactionDashboard.git
cd transaction-dashboard
```

---

## 🖥️ Frontend Setup
### 📌 2. Install Dependencies
```sh
cd frontend
npm install
```

### 🔧 3. Set Up Environment Variables  
Create a **`.env` file** in the `frontend/` folder:
```sh
VITE_BACKEND_URL=https://your-backend.vercel.app
```

### ▶️ 4. Run Frontend Locally
```sh
npm run dev
```
Now, visit **`http://localhost:5173`** in your browser.  

---

## 🌐 Backend Setup
### 📌 5. Install Dependencies
```sh
cd backend
npm install
```

### 🔧 6. Set Up Environment Variables  
Create a **`.env` file** in the `backend/` folder:
```sh
DATABASE_URL=postgresql://transactions_owner:your_password@your_host/transactions?sslmode=require
PORT=5000
```

### ▶️ 7. Run Backend Locally
```sh
npm start
```
Now, your backend will be running on **`(https://transaction-dashboard-pi.vercel.app)`**.  

---

🚀 Deployment Guide
🌍 Deploy Backend to Vercel
1️⃣ Push backend to GitHub
2️⃣ Go to Vercel → New Project → Select repo
3️⃣ Set Root Directory to /backend
4️⃣ Add environment variables (DATABASE_URL, PORT=5000)
5️⃣ Deploy backend → Get Backend URL

🌍 Deploy Frontend to Vercel
1️⃣ Push frontend to GitHub
2️⃣ Go to Vercel → New Project → Select repo
3️⃣ Set Root Directory to /frontend
4️⃣ Add VITE_BACKEND_URL = https://your-backend.vercel.app
5️⃣ Deploy frontend → [Live Link🔗](https://transactiondashboard.vercel.app/)

## 📸 Screenshots

### 📌 Dashboard View  
![Transactions](https://github.com/user-attachments/assets/e5622ec9-136c-45d1-a1a6-bbe3888d57c2)


### 📌 Charts & Analytics  
![Charts](https://github.com/user-attachments/assets/39017cb4-9eb3-4aef-a860-af394b1e862a)


---

## 🤝 Contributing
Feel free to submit issues or pull requests. Contributions are always welcome!  

---

## 📜 License
This project is licensed under the **MIT License**.  

---

## ✨ Acknowledgments
Thanks to:
- **Neon.tech** for serverless PostgreSQL  
- **Bootstrap** for UI components  
- **Chart.js** for beautiful graphs  
