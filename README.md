# 🚆 RailNova

RailNova is a full-stack railway ticket booking web application developed as an educational project. It provides a simple railway reservation experience where users can search for trains, register and verify their accounts using OTP, book tickets, view PNR details, manage bookings, and receive ticket confirmation emails.

---

## ✨ Features

* 🔐 User Registration and Login
* 📧 Email OTP Verification
* 🚆 Train Search
* 🎫 Train Ticket Booking
* 💳 Simulated Payment System
* 🧾 Automatic PNR Generation
* 💺 Automatic Coach and Seat Allocation
* 📩 Ticket Booking Confirmation Email
* 🔎 PNR Status Checking
* 📋 View My Bookings
* ❌ Cancel Bookings
* 🚉 Live Train Status
* 👨‍💼 Admin Features
* 📱 Responsive User Interface

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

### Email Service

* Gmail SMTP
* Nodemailer

---

## 📂 Project Structure

```text
RailNova/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   └── ...
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SANYAM-MANIT/RailNova.git
```

### 2. Open the Project

```bash
cd RailNova
```

---

## 🔧 Backend Setup

Open the backend folder:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder.

Add your environment variables:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

> ⚠️ Never upload your `.env` file to GitHub.

Start the backend server:

```bash
npm start
```

The backend will run on:

```text
http://localhost:8080
```

---

## 🌐 Frontend Setup

Open the `frontend` folder in Visual Studio Code.

You can run the frontend using the **Live Server** extension.

Right-click on `index.html` and select:

```text
Open with Live Server
```

The frontend will usually run on:

```text
http://localhost:5500
```

Make sure your frontend API requests point to the local backend:

```text
http://localhost:8080
```

---

## 🔐 Authentication Flow

RailNova uses JWT authentication to protect user-specific features.

```text
User Registration
       ↓
Email OTP Verification
       ↓
Login
       ↓
JWT Token Generated
       ↓
Access Protected Features
```

---

## 🎫 Ticket Booking Flow

```text
Search Train
       ↓
Select Train
       ↓
Enter Passenger Details
       ↓
Select Berth Preference
       ↓
Payment
       ↓
Booking Confirmed
       ↓
PNR Generated
       ↓
Ticket Saved in MongoDB
       ↓
Confirmation Email Sent
```

---

## 📧 Booking Confirmation Email

After a successful ticket booking, RailNova sends a confirmation email containing important ticket information such as:

* PNR Number
* Train Name
* Train Number
* Source and Destination
* Journey Date
* Passenger Details
* Coach Number
* Seat Number
* Berth Preference
* Fare Paid
* Transaction ID

---

## 🔎 PNR Status

Users can enter their PNR number to view their ticket and booking details.

---

## ❌ Ticket Cancellation

Users can cancel their confirmed bookings. After cancellation, the available seat count of the selected train is updated accordingly.

---

## 👨‍💻 Developer

### Sanyam Jain

B.Tech CSE Student at **MANIT Bhopal**.

Interested in **Full-Stack Web Development, Backend Development, and Data Structures & Algorithms**.

🔗 **GitHub:** [SANYAM-MANIT](https://github.com/SANYAM-MANIT)

---

*Built with ❤️ by Sanyam Jain | MANIT Bhopal*

## 📌 Disclaimer

RailNova is an educational full-stack project created for learning and demonstrating web development, backend development, REST APIs, database integration, authentication, and email services.

This project does not provide real railway ticket booking or real payment processing.
