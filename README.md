# 🚆 RailNova — Next-Gen AI-Powered Railway Reservation & Management System

<p align="center">
  <img src="https://img.shields.io/badge/RailNova-v1.0.0-2563eb?style=for-the-badge&logo=train&logoColor=white" alt="RailNova Version" />
  <img src="https://img.shields.io/badge/AI_Assistant-Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Google Gemini AI" />
  <img src="https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Security-JWT_%26_Bcrypt-red?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="Security" />
  <img src="https://img.shields.io/badge/Brevo_API-Transactional_Emails-0092FF?style=for-the-badge&logo=sendinblue&logoColor=white" alt="Brevo API" />
  <img src="https://img.shields.io/badge/Deployment-Render_%26_Vercel-000000?style=for-the-badge&logo=render&logoColor=white" alt="Deployment" />
</p>

<p align="center">
  <b>A feature-packed full-stack web application featuring AI passenger assistance, online train booking, automated ticket & PNR generation, transactional email notifications, enterprise security, and administrative railway analytics.</b>
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

**RailNova** digitizes the entire railway reservation lifecycle. It empowers passengers with an **AI-powered travel assistant**, real-time train search, coach and berth preference selection, secure OTP email verification, simulated payments, auto-assigned seat allocations, automated PNR generation, and digital ticket management.

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
  ├── 🔍 Train Search & Availability              ├── 💰 Revenue & Booking Trends
  ├── 📧 Dual-Provider Email Verification         ├── 🚆 Train Inventory Control
  ├── 💺 Dynamic Coach & Seat Allocation          ├── 🔐 Restricted Access Guard
  ├── 💳 Simulated Payment & PNR Generation       └── 📈 Real-Time Audit Monitoring
  ├── 📩 PDF & QR Ticket Generation
  └── ❌ Real-Time Ticket Cancellation
```

---

## 🚀 Key Features

### 👤 Passenger Portal
* **🤖 RailNova AI Travel Assistant**: Conversational AI helper answering questions about train availability, coach classes (`1A`, `2A`, `3A`, `SL`), PNR status, and cancellation policies in real-time.
* **🔐 Secure Authentication & Email OTP**: Complete registration flow backed by **Brevo REST API** & **Nodemailer SMTP** for fast OTP delivery.
* **🔎 Smart Train Search**: Search trains by departure/destination, date, and availability status.
* **💺 Intelligent Seat & Coach Allocation**: Automatic assignment of coaches (`S1`, `B1`, `A1`, `H1`) and berths (`Lower`, `Middle`, `Upper`, `Side Lower`, `Side Upper`).
* **💳 Simulated Payment Gateway**: Instant ticket confirmation with transaction ID generation and fare summary.
* **🧾 10-Digit PNR System**: Unique PNR generation for seamless ticket tracking and status verification.
* **📱 QR Code & PDF Export**: Instant QR code generation for station scanning and single-click PDF ticket download (`jsPDF`).
* **📩 Ticket Confirmation Email**: Automatic email dispatched directly to the passenger containing full journey details.
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

### AI Capabilities:
- **🚆 Train & Fare Guidance**: Explains differences between 1A, 2A, 3A, Sleeper, and Tatkal quotas.
- **🧾 PNR & Booking Help**: Step-by-step assistance for checking PNR status and managing bookings.
- **❌ Refund & Cancellation Info**: Provides accurate cancellation fee and seat restoration policies.
- **💬 Sleek Floating UI Widget**: Accessible across pages with typing indicators and smooth responsive layout.

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

### 1. 🔑 Stateless Token Authentication (JWT)
* Private endpoints (ticket booking, cancellations, personal history) require a valid HTTP `Authorization: Bearer <token>` header.

### 2. 🔒 Cryptographic Password Hashing (Bcrypt.js)
* Uses **Bcrypt.js** (salt factor `10`) to hash passwords before database storage.

### 3. 📧 Two-Step OTP Email Verification
* Requires a 6-digit dynamic OTP sent via **Brevo API / Nodemailer** to verify emails during signup & password resets.

### 4. 🛡️ Role-Based Access Control (RBAC)
* Admin routes (`/api/admin/*`) are protected by `adminMiddleware.js`, rejecting unauthorized users with `403 Forbidden`.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Glassmorphism UI), JavaScript (ES6+), Fetch API |
| **Backend** | Node.js, Express.js (REST API Architecture) |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **AI Integration** | **Google Gemini API (1.5 Flash)** + **Railway Knowledge Engine** |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js (Password Hashing) |
| **Transactional Email** | **Brevo REST API (HTTPS)** + **Nodemailer (Gmail SMTP)** |
| **Ticket Utilities** | QR Code Generator (`qrcode.js`), PDF Exporter (`jsPDF`) |
| **Security** | Express Authorization Middleware, RBAC Guards, Validator.js, CORS |
| **Hosting** | Render (Backend API), Vercel (Frontend Client) |

---

## ⚡ Email Service Architecture (Dual Provider)

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
│   ├── 📁 controllers/   # Auth, Booking, Train, Admin, & AI Logic
│   ├── 📁 middleware/    # JWT & Admin Authorization Guards
│   ├── 📁 models/        # Mongoose Schemas (User, Train, Booking)
│   ├── 📁 routes/        # Express Routes (auth, train, booking, admin, ai)
│   ├── 📁 utils/         # Dual Brevo/Nodemailer Mail Utility (sendEmail.js)
│   ├── 📄 server.js      # Main Application Entry Point
│   └── 📄 package.json   # Node Dependencies
│
└── 📁 frontend/          # Responsive UI & Dynamic Scripts
    ├── 📄 index.html     # Landing & Train Search
    ├── 📄 login.html     # User Login
    ├── 📄 signup.html    # User Registration & OTP Verification
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

### 3️⃣ Run Locally
```bash
npm run dev
```
The server will start at `http://localhost:8080`.

### 4️⃣ Open Frontend
Open `frontend/index.html` in your browser or run it using **VS Code Live Server**.

---

## 🔗 Backend API Reference

| Endpoint | Method | Description | Security Level |
| :--- | :--- | :--- | :--- |
| `/api/ai/chat` | `POST` | Process AI assistant queries | Public |
| `/api/auth/signup` | `POST` | Register user & send OTP email | Public |
| `/api/auth/verify-otp` | `POST` | Verify OTP & activate account | Public |
| `/api/auth/login` | `POST` | Authenticate user & issue JWT | Public |
| `/api/auth/forgot-password` | `POST` | Send password reset OTP | Public |
| `/api/trains/search` | `GET` | Search trains by route & date | Public |
| `/api/bookings/book` | `POST` | Book ticket, assign seats & send email | Private (JWT Required) |
| `/api/bookings/my-bookings`| `GET` | Fetch user booking history | Private (JWT Required) |
| `/api/bookings/cancel/:id` | `DELETE`| Cancel booking & release seat | Private (JWT Required) |
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
