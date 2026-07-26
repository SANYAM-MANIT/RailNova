# 🚆 RailNova — Next-Gen AI-Powered Railway Reservation & Management System

<p align="center">
  <img src="https://img.shields.io/badge/RailNova-v1.2.0-2563eb?style=for-the-badge&logo=train&logoColor=white" alt="RailNova Version" />
  <img src="https://img.shields.io/badge/AI_Assistant-Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Google Gemini AI" />
  <img src="https://img.shields.io/badge/Group_Booking-Up_to_6_Pass-10b981?style=for-the-badge&logo=users&logoColor=white" alt="Group Booking" />
  <img src="https://img.shields.io/badge/Tatkal_Quota-Emergency_Surge-f59e0b?style=for-the-badge&logo=lightning&logoColor=white" alt="Tatkal Quota" />
  <img src="https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-1500+_Trains-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Brevo_API-Transactional_Emails-0092FF?style=for-the-badge&logo=sendinblue&logoColor=white" alt="Brevo API" />
</p>

<p align="center">
  <b>A production-grade full-stack web application featuring AI passenger assistance, 1500+ Indian train routes, multi-passenger group booking, individual passenger concessions, Tatkal emergency quotas, automated PNR & seat allocation, transactional emails, enterprise security, and administrative analytics.</b>
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-ai-assistant-integration">AI Assistant</a> •
  <a href="#-security--data-protection">Security</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#-installation--setup">Setup Guide</a> •
  <a href="#-api-reference">API Docs</a> •
  <a href="#-developer">Developer</a>
</p>

---

## 🌟 Overview

**RailNova** digitizes the entire railway reservation lifecycle across 1,500+ real-style Indian train routes (Delhi, Mumbai, Bhopal, Ujjain, Varanasi, Bangalore, Kolkata, etc.). It empowers passengers with an **AI-powered travel assistant**, multi-passenger group bookings, individual concession calculations, Tatkal emergency quotas, real-time train search, coach and berth preference selection, secure OTP email verification, simulated payments, auto-assigned seat allocations, automated PNR generation, and digital ticket management.

For administrators, **RailNova** delivers a powerful, protected analytics dashboard featuring system statistics, revenue metrics, live user monitoring, and train inventory management.

```
       ┌─────────────────────────────────────────────────────────┐
       │                   🚆 RAILNOVA PLATFORM                  │
       └────────────────────────────┬────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
  👤 Passenger Portal                             👨‍💼 Admin Panel
  ├── 🤖 RailNova AI Travel Assistant              ├── 📊 Live System Analytics
  ├── 🔍 Train Search (1500+ Indian Routes)       ├── 💰 Revenue & Booking Trends
  ├── 👥 Multi-Passenger Booking (Up to 6 Pass)   ├── 🚆 Train Inventory Control
  ├── 🎟️ Per-Passenger Concession Engine          ├── 🔐 Restricted Access Guard
  ├── ⚡ Tatkal & Premium Tatkal Quota Engine     └── 📈 Real-Time Audit Monitoring
  ├── 📧 Dual-Provider Email Verification
  ├── 💺 Dynamic Contiguous Seat Allocation
  ├── 💳 Simulated Payment & PNR Generation
  ├── 📩 PDF & QR Ticket Generation
  └── ❌ Real-Time Ticket Cancellation
```

---

## 🚀 Key Features

### 👤 Passenger Portal
* **🤖 RailNova AI Travel Assistant**: Conversational AI helper answering questions about train availability, coach classes (`1A`, `2A`, `3A`, `SL`), PNR status, and cancellation policies in real-time.
* **👥 Multi-Passenger Group Booking**: Book tickets for up to **6 passengers per transaction** with dynamic form inputs and contiguous seat allocation in the same coach bay.
* **🎟️ Per-Passenger Concession Engine**: Individual discount calculations for Senior Citizens (40% Off) and PWD (50% Off) per passenger within group bookings.
* **⚡ Emergency Tatkal & Premium Tatkal Quotas**: Last-minute priority booking quotas with surge pricing and golden **"⚡ TATKAL CONFIRMED"** e-ticket badges.
* **🔍 1,500+ Indian Train Dataset**: Pre-seeded database covering major Indian stations (Delhi, Mumbai, Bhopal, Ujjain Mahakal, Varanasi, etc.).
* **🔐 Secure Authentication & Email OTP**: Complete registration flow backed by **Brevo REST API** & **Nodemailer SMTP** for fast OTP delivery.
* **💺 Intelligent Seat & Coach Allocation**: Automatic assignment of coaches (`S1`, `B1`, `A1`, `H1`) and berths (`Lower`, `Middle`, `Upper`, `Side Lower`, `Side Upper`).
* **💳 Simulated Payment Gateway**: Instant ticket confirmation with transaction ID generation and fare summary.
* **🧾 10-Digit PNR System**: Unique PNR generation for seamless ticket tracking and status verification.
* **📱 QR Code & PDF Export**: Instant QR code generation for station scanning and single-click PDF ticket download (`jsPDF`).
* **📩 Group Ticket Confirmation Email**: Automatic HTML email dispatched directly to the passenger containing full passenger manifest tables.
* **📋 Booking Management**: View active and historical bookings with one-click cancellation and seat restoration.

### 👨‍💼 Admin Dashboard
* **📊 Visual System Analytics**: Graphical breakdown of revenue, total passengers, active bookings, and train count.
* **🚆 Train Inventory Control**: Add, update, and manage train schedules, routes, fares, and seat capacities.
* **👥 User & Booking Audit**: Live monitoring of user activity and booking transactions.
* **🛡️ Protected Admin Routes**: Middleware-enforced security restricting administrative features to verified admins.

---

## 🤖 AI Assistant Integration

RailNova features an intelligent, floating **AI Assistant** (`/api/ai/chat`) built with a dual fallback strategy:

```text
               ┌───────────────────────────────┐
               │    User Asks RailNova AI      │
               └───────────────┬───────────────┘
                               │
                               ▼
                Is GEMINI_API_KEY Configured?
                   /                       \
                 YES                        NO
                 /                           \
                ▼                             ▼
   🤖 Google Gemini 1.5 Flash API     🧠 Railway Knowledge Base (Fallback)
   - Real-time Generative Answers     - Instant Coach & Fare Rules
   - Natural Language Context        - PNR & Booking Guidance
```

---

## 🛡️ Security & Data Protection

Security is a foundational pillar of RailNova's architecture:

```text
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                         SECURITY & PROTECTION LAYERS                    │
  ├─────────────────────────────────────────────────────────────────────────┤
  │ 🔑 Authentication Layer  ──► JWT (JSON Web Tokens) Bearer Tokens       │
  │ 🔒 Password Security     ──► Bcrypt.js Hashing with Salt Rounds (10)   │
  │ 📧 Identity Verification ──► 6-Digit Time-Sensitive OTP via Email       │
  │ 🛡️ Authorization Guard  ──► Middleware-Enforced Role Checks (RBAC)    │
  │ 🌐 Input Protection      ──► Email & Payload Validation (validator.js) │
  │ 🔐 Secret Isolation      ──► Environment Variables & .gitignore Policy │
  └─────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Glassmorphism UI), JavaScript (ES6+), Fetch API |
| **Backend** | Node.js, Express.js (REST API Architecture) |
| **Database** | MongoDB Atlas (1,500+ Indian Trains Dataset), Mongoose ODM |
| **AI Integration** | **Google Gemini API (1.5 Flash)** + **Railway Knowledge Engine** |
| **Booking Features** | Multi-Passenger Engine, Per-Passenger Concession, Tatkal Quota |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js (Password Hashing) |
| **Transactional Email** | **Brevo REST API (HTTPS)** + **Nodemailer (Gmail SMTP)** |
| **Ticket Utilities** | QR Code Generator (`qrcode.js`), PDF Exporter (`jsPDF`) |
| **Security** | Express Authorization Middleware, RBAC Guards, Validator.js, CORS |
| **Hosting** | Render (Backend API), Vercel (Frontend Client) |

---

## 📁 Project Structure

```text
RailNova/
│
├── 📁 backend/
│   ├── 📁 config/        # Database Connection Configuration
│   ├── 📁 controllers/   # Auth, Booking, Train, Admin, & AI Logic
│   ├── 📁 middleware/    # JWT & Admin Authorization Guards
│   ├── 📁 models/        # Mongoose Schemas (User, Train, Booking)
│   ├── 📁 routes/        # Express Routes (auth, train, booking, admin, ai)
│   ├── 📁 utils/         # Dual Brevo/Nodemailer Mail Utility (sendEmail.js)
│   ├── 📄 generateTrains.js # 1500+ Indian Trains Dataset Generator
│   ├── 📄 seedTrainData.js # MongoDB Atlas Dataset Seeder
│   ├── 📄 server.js      # Main Application Entry Point
│   └── 📄 package.json   # Node Dependencies
│
└── 📁 frontend/          # Responsive UI & Dynamic Scripts
    ├── 📄 index.html     # Landing & Train Search
    ├── 📄 login.html     # User Login
    ├── 📄 signup.html    # User Registration & OTP Verification
    ├── 📄 train-search.html # Train Search with Quota & Class Filters
    ├── 📄 book-ticket.html  # Multi-Passenger Booking Form
    ├── 📄 payment.html      # Payment Gateway Summary
    ├── 📄 ticket.html    # Digital Ticket Display with QR & PDF Download
    ├── 📄 pnr.html       # PNR Search & Status
    ├── 📄 admin.html     # Administrator Analytics Dashboard
    ├── 📁 css/ai-chat.css# AI Chatbot Widget Stylesheet
    └── 📁 js/ai-chat.js  # AI Chatbot Widget Logic
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
BREVO_API_KEY=your_brevo_api_key

# Optional Google Gemini AI Key
GEMINI_API_KEY=your_google_gemini_api_key
```

### 3️⃣ Seed 1500+ Trains
```bash
node generateTrains.js
node seedTrainData.js
```

### 4️⃣ Run Locally
```bash
npm run dev
```
The server will start at `http://localhost:8080`.

---

## 🔗 Backend API Reference

| Endpoint | Method | Description | Security Level |
| :--- | :--- | :--- | :--- |
| `/api/ai/chat` | `POST` | Process AI assistant queries | Public |
| `/api/auth/signup` | `POST` | Register user & send OTP email | Public |
| `/api/auth/verify-otp` | `POST` | Verify OTP & activate account | Public |
| `/api/auth/login` | `POST` | Authenticate user & issue JWT | Public |
| `/api/auth/forgot-password` | `POST` | Send password reset OTP | Public |
| `/api/trains/search` | `GET` | Search 1500+ trains by route & date | Public |
| `/api/bookings/book` | `POST` | Book multi-passenger ticket & Tatkal quota | Private (JWT Required) |
| `/api/bookings/my-bookings`| `GET` | Fetch user booking history | Private (JWT Required) |
| `/api/bookings/cancel/:id` | `DELETE`| Cancel group booking & restore seats | Private (JWT Required) |
| `/api/pnr/:pnr` | `GET` | Retrieve booking status by PNR | Public |
| `/api/admin/stats` | `GET` | System dashboard metrics & revenue | Protected (Admin RBAC) |

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
