# 🚆 RailNova — Next-Gen Railway Reservation & Management System

<p align="center">
  <img src="https://img.shields.io/badge/RailNova-v1.0.0-2563eb?style=for-the-badge&logo=train&logoColor=white" alt="RailNova Version" />
  <img src="https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Brevo_API-Transactional_Emails-0092FF?style=for-the-badge&logo=sendinblue&logoColor=white" alt="Brevo API" />
  <img src="https://img.shields.io/badge/Deployment-Render_%26_Vercel-000000?style=for-the-badge&logo=render&logoColor=white" alt="Deployment" />
</p>

<p align="center">
  <b>A feature-packed full-stack web application for seamless online train booking, automated ticket & PNR generation, transactional email notifications, and administrative railway analytics.</b>
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#-installation--setup">Setup Guide</a> •
  <a href="#-api-endpoints">API Docs</a> •
  <a href="#-developer">Developer</a>
</p>

---

## 🌟 Overview

**RailNova** digitizes the entire railway reservation lifecycle. It empowers passengers with real-time train search, coach and berth preference selection, secure OTP email verification, simulated payments, auto-assigned seat allocations, automated PNR generation, and digital ticket management.

For administrators, **RailNova** delivers a powerful, protected analytics dashboard featuring system statistics, revenue metrics, live user monitoring, and train inventory management.

```
       ┌─────────────────────────────────────────────────────────┐
       │                   🚆 RAILNOVA PLATFORM                  │
       └────────────────────────────┬────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
  👤 Passenger Portal                             👨‍💼 Admin Panel
  ├── 🔍 Train Search & Availability              ├── 📊 Live System Analytics
  ├── 📧 Dual-Provider Email Verification         ├── 💰 Revenue & Booking Trends
  ├── 💺 Dynamic Coach & Seat Allocation          ├── 🚆 Train Inventory Control
  ├── 💳 Simulated Payment & PNR Generation       └── 🔐 Restricted Access Guard
  ├── 📩 PDF-Style Ticket Email Delivery
  └── ❌ Real-Time Ticket Cancellation
```

---

## 🚀 Key Features

### 👤 Passenger Portal
* **🔐 Secure Authentication & Email OTP**: Complete registration flow backed by **Brevo REST API** & **Nodemailer SMTP** for fast OTP delivery.
* **🔎 Smart Train Search**: Search trains by departure/destination, date, and availability status.
* **💺 Intelligent Seat & Coach Allocation**: Automatic assignment of coaches (`S1`, `B1`, `A1`, `H1`) and berths (`Lower`, `Middle`, `Upper`, `Side Lower`, `Side Upper`).
* **💳 Simulated Payment Gateway**: Instant ticket confirmation with transaction ID generation and fare summary.
* **🧾 10-Digit PNR System**: Unique PNR generation for seamless ticket tracking and status verification.
* **📩 Instant Ticket Confirmation Email**: Automatic email dispatched directly to the passenger containing full journey details.
* **📋 Booking Management**: View active and historical bookings with one-click cancellation and seat restoration.

### 👨‍💼 Admin Dashboard
* **📊 Visual System Analytics**: Graphical breakdown of revenue, total passengers, active bookings, and train count.
* **🚆 Train Inventory Control**: Add, update, and manage train schedules, routes, fares, and seat capacities.
* **👥 User & Booking Audit**: Live monitoring of user activity and booking transactions.
* **🛡️ Protected Admin Routes**: Middleware-enforced security restricting administrative features to verified admins.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Modern Glassmorphism Design), JavaScript (ES6+), Fetch API |
| **Backend** | Node.js, Express.js (REST API Architecture) |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js (Password Hashing) |
| **Transactional Email** | **Brevo REST API (HTTPS)** + **Nodemailer (Gmail SMTP Fallback)** |
| **Utilities** | Axios, Cors, Dotenv, Validator |
| **Hosting** | Render (Backend API), Vercel (Frontend Client) |

---

## ⚡ Email Service Architecture (Dual Provider)

RailNova features a production-ready dual email provider system engineered to eliminate cloud host port-blocking issues (e.g. Render / Heroku outbound SMTP restrictions):

```text
               ┌───────────────────────────────┐
               │    Trigger Email Notification  │
               └───────────────┬───────────────┘
                               │
                               ▼
                Is BREVO_API_KEY Configured?
                   /                       \
                 YES                        NO
                 /                           \
                ▼                             ▼
   🚀 Brevo REST API (Port 443)    📧 Nodemailer Gmail SMTP (Port 465/587)
   - Bypasses Cloud Port Block     - Automatic Password Sanitization
   - Fast & Reliable               - Secure TLS Connection
```

---

## 📁 Project Structure

```text
RailNova/
│
├── 📁 backend/
│   ├── 📁 config/        # Database Connection Configuration
│   ├── 📁 controllers/   # Auth, Booking, Train, Admin Logic
│   ├── 📁 middleware/    # JWT & Admin Authorization Guards
│   ├── 📁 models/        # Mongoose Data Schemas (User, Train, Booking)
│   ├── 📁 routes/        # Express Route Handlers
│   ├── 📁 utils/         # Dual Brevo/Nodemailer Mail Utility (sendEmail.js)
│   ├── 📄 server.js      # Main Application Entry Point
│   └── 📄 package.json   # Node Dependencies
│
└── 📁 frontend/          # Responsive User Interface (HTML, CSS, JS)
    ├── 📄 index.html     # Landing & Train Search
    ├── 📄 login.html     # User Login
    ├── 📄 signup.html    # User Registration & OTP Verification
    ├── 📄 ticket.html    # Digital Ticket Display
    ├── 📄 pnr.html       # PNR Search & Status
    └── 📄 admin.html     # Administrator Analytics Dashboard
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SANYAM-MANIT/RailNova.git
cd RailNova
```

### 2️⃣ Configure Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```env
PORT=8080
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key

# Transactional Email Setup
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Brevo API (Recommended for Cloud Production Deployment)
BREVO_API_KEY=your_brevo_api_key
```

### 3️⃣ Run Locally
```bash
npm run dev
```
The server will start at `http://localhost:8080`.

### 4️⃣ Open Frontend
Open `frontend/index.html` in your browser or run it using **VS Code Live Server**.

---

## 🔗 Backend API Reference

| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/auth/signup` | `POST` | Register user & send OTP email | Public |
| `/api/auth/verify-otp` | `POST` | Verify OTP & activate account | Public |
| `/api/auth/login` | `POST` | Authenticate user & issue JWT | Public |
| `/api/auth/forgot-password` | `POST` | Send password reset OTP | Public |
| `/api/trains/search` | `GET` | Search trains by route & date | Public |
| `/api/bookings/book` | `POST` | Book ticket, assign seats & send email | Private (JWT) |
| `/api/bookings/my-bookings`| `GET` | Fetch user booking history | Private (JWT) |
| `/api/bookings/cancel/:id` | `DELETE`| Cancel booking & release seat | Private (JWT) |
| `/api/pnr/:pnr` | `GET` | Retrieve booking status by PNR | Public |
| `/api/admin/stats` | `GET` | System dashboard metrics & revenue | Admin |

---

## 👨‍💻 Author & Credits

**Sanyam Jain**  
🎓 *B.Tech – Computer Science & Engineering*  
🏫 **MANIT Bhopal (Maulana Azad National Institute of Technology)**

<p align="left">
  <a href="https://github.com/SANYAM-MANIT"><img src="https://img.shields.io/badge/GitHub-SANYAM--MANIT-181717?style=flat&logo=github" alt="GitHub" /></a>
</p>

---

<p align="center">
  <b>⭐ If you like this project, please consider giving it a star on GitHub! ⭐</b>
</p>
