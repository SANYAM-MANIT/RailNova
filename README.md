# 🚆 RailNova

### 🎫 Online Railway Reservation & Management System

<p align="center">
  <b>🚆 Your Journey Begins Here</b>
</p>

<p align="center">
  RailNova is a full-stack railway reservation and management system that provides users with a complete digital ticket booking experience and administrators with a centralized dashboard to manage and monitor the railway system.
</p>

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-REST_API-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![JavaScript](https://img.shields.io/badge/JavaScript-Frontend-yellow?logo=javascript)
![JWT](https://img.shields.io/badge/JWT-Authentication-purple?logo=jsonwebtokens)
![GitHub](https://img.shields.io/badge/GitHub-Repository-black?logo=github)

</p>

---

## 📌 About RailNova

**RailNova** is a full-stack railway reservation web application developed to provide a complete railway ticket booking experience through a simple and user-friendly interface.

The system is divided into two major sections:

### 👤 User Portal

The User Portal allows passengers to register, verify their email, securely log in, search for trains, enter passenger details, select coach and berth preferences, complete a simulated payment, and receive a confirmed railway ticket.

Users can also manage their bookings, check PNR status, view ticket details, check live train status, and cancel their tickets.

### 👨‍💼 Admin Panel

The Admin Panel provides administrators with a centralized platform to monitor and manage the railway reservation system.

The dashboard provides important statistics such as users, bookings, trains, and revenue. It also uses charts and visual representations to make system activity easier to understand.

The application also implements security features such as JWT authentication, password hashing, OTP verification, protected routes, authentication middleware, and admin authorization.

---

# ✨ Main Features

| Feature                        | Description                                                 |
| ------------------------------ | ----------------------------------------------------------- |
| 🔐 **User Authentication**     | Secure registration and login system for users              |
| 📧 **Email OTP Verification**  | New users verify their email before completing registration |
| 🔑 **JWT Authentication**      | Token-based authentication for secure user sessions         |
| 🔒 **Password Hashing**        | Passwords are securely hashed using bcrypt                  |
| 🛡️ **Protected Routes**       | Private APIs are accessible only to authenticated users     |
| 👨‍💼 **Admin Panel**          | Dedicated dashboard for administrators                      |
| 📊 **Admin Charts**            | Visual representation of system statistics                  |
| 👥 **User Statistics**         | Monitor registered users through the admin dashboard        |
| 🎫 **Booking Statistics**      | Monitor total and booking-related information               |
| 🚆 **Train Management**        | Manage and monitor train information                        |
| 💰 **Revenue Statistics**      | Display booking and revenue-related data                    |
| 🔎 **Train Search**            | Search for trains based on journey requirements             |
| 🎫 **Ticket Booking**          | Complete railway ticket booking workflow                    |
| 💺 **Coach & Seat Allocation** | Automatically assign coach and seat numbers                 |
| 🛏️ **Berth Preference**       | Allow passengers to select berth preferences                |
| 💳 **Payment System**          | Simulated payment process for ticket confirmation           |
| 🧾 **PNR Generation**          | Automatically generate a unique PNR for every booking       |
| 📩 **Confirmation Email**      | Send detailed ticket confirmation emails                    |
| 🔎 **PNR Status**              | Search ticket information using PNR                         |
| 📋 **My Bookings**             | View all bookings made by the logged-in user                |
| ❌ **Ticket Cancellation**      | Cancel confirmed tickets and update available seats         |
| 🚉 **Live Train Status**       | Access train status information                             |
| 🌐 **REST APIs**               | Backend functionality exposed through RESTful APIs          |
| 🗄️ **MongoDB Database**       | Store users, trains, bookings, and application data         |

---

# 👤 User Portal

The User Portal is designed to provide passengers with a complete railway reservation experience.

## 📝 1. User Registration

New users can create an account by providing their required information.

The registration system is integrated with email OTP verification to ensure that the provided email address is valid.

```text
📝 Create Account
       ↓
📧 OTP Generated
       ↓
📩 OTP Sent to Email
       ↓
🔢 Enter OTP
       ↓
✅ Email Verified
       ↓
👤 Account Created
```

---

## 🔐 2. Secure Login

Registered users can securely log in to their accounts.

After successful authentication, the backend generates a JWT token that is used to authorize requests to protected APIs.

The token is stored on the frontend and sent with protected API requests using the Authorization header.

This prevents unauthorized users from accessing private application functionality.

---

## 🚆 3. Train Search

Users can search for available trains based on their journey.

Train information includes:

| Information        | Description               |
| ------------------ | ------------------------- |
| 🚆 Train Name      | Name of the train         |
| 🔢 Train Number    | Unique train number       |
| 📍 From            | Starting station          |
| 📍 To              | Destination station       |
| 🕐 Departure       | Departure time            |
| 🕐 Arrival         | Arrival time              |
| 💺 Available Seats | Current seat availability |
| 💰 Fare            | Ticket fare               |

---

## 🎫 4. Ticket Booking

After selecting a train, users can proceed to the ticket booking process.

Passengers can provide:

* 👤 Passenger Name
* 🎂 Age
* ⚧️ Gender
* 📱 Mobile Number
* 📧 Email Address
* 🚆 Coach Type
* 🛏️ Berth Preference
* 💰 Fare Information
* 🎟️ Concession Details

Once the booking is completed successfully, the system creates a booking record in MongoDB.

---

## 💺 5. Coach & Seat Allocation

RailNova automatically assigns coach and seat information to confirmed bookings.

The coach is generated according to the selected coach type.

| Coach Type  | Example Coach |
| ----------- | ------------- |
| 🛏️ Sleeper | S1, S2, S3... |
| 🛌 3A       | B1, B2...     |
| 🛌 2A       | A1, A2...     |
| 👑 1A       | H1            |
| 🚆 Other    | C1, C2...     |

A seat number is also automatically generated for the confirmed ticket.

---

## 💳 6. Payment Process

RailNova contains a simulated payment workflow for demonstration purposes.

The user selects a payment method and proceeds with the payment process.

After successful payment:

```text
💳 Payment Successful
        ↓
🎫 Booking Created
        ↓
🧾 PNR Generated
        ↓
💺 Coach Assigned
        ↓
💺 Seat Assigned
        ↓
📩 Confirmation Email
```

The system stores:

* Payment method
* Payment status
* Transaction ID
* Fare paid
* Original fare
* Discount
* Concession details

> ⚠️ The current payment system is simulated and does not process real financial transactions.

---

# 🧾 Ticket & PNR System

After a successful booking, RailNova generates a unique **10-digit PNR number**.

The confirmed booking contains:

| Ticket Information | Details                       |
| ------------------ | ----------------------------- |
| 🧾 PNR             | Unique booking identifier     |
| 🚆 Train           | Train name and number         |
| 🛤️ Route          | Source and destination        |
| 📅 Journey Date    | Scheduled journey date        |
| 🕐 Departure       | Departure time                |
| 🕐 Arrival         | Arrival time                  |
| 👤 Passenger       | Passenger information         |
| 🚉 Coach           | Assigned coach                |
| 💺 Seat            | Assigned seat                 |
| 🛏️ Berth          | Selected berth preference     |
| 💰 Fare            | Amount paid                   |
| 💳 Payment         | Payment status                |
| 🔢 Transaction ID  | Unique transaction identifier |
| 📌 Status          | Confirmed or Cancelled        |

Users can use their PNR number to retrieve their booking details.

---

# 📩 Email Confirmation

RailNova provides automated email notifications after important user actions.

## 📧 OTP Email

During registration, an OTP is sent to the user's email address.

This verifies that the user has access to the provided email account.

## 🎫 Booking Confirmation Email

After a successful ticket booking, the system sends a detailed confirmation email.

The email contains:

* 🧾 PNR Number
* 🚆 Train Name
* 🔢 Train Number
* 🛤️ Journey Route
* 📅 Journey Date
* 🕐 Departure Time
* 🕐 Arrival Time
* 👤 Passenger Name
* 🎂 Passenger Age
* ⚧️ Gender
* 🚉 Coach Number
* 💺 Seat Number
* 🛏️ Berth
* 💰 Fare Paid
* 💳 Payment Status
* 🔢 Transaction ID
* 🪪 Government ID Travel Reminder

The email provides passengers with all important ticket information in one place.

---

# 📋 My Bookings

Authenticated users can access their booking history.

The **My Bookings** section displays tickets associated with the currently logged-in user.

Users can view:

* 🎫 Booking details
* 🧾 PNR number
* 🚆 Train information
* 🛤️ Journey route
* 📅 Journey date
* 👤 Passenger information
* 🚉 Coach number
* 💺 Seat number
* 🛏️ Berth
* 💰 Fare
* 💳 Payment status
* 📌 Booking status

Bookings are retrieved from MongoDB using the authenticated user's ID.

---

# ❌ Ticket Cancellation

Users can cancel their confirmed tickets.

When a booking is cancelled:

```text
🎫 Confirmed Ticket
        ↓
❌ User Cancels Ticket
        ↓
📌 Status → Cancelled
        ↓
💺 Available Seats + 1
```

The system automatically increases the available seat count of the associated train.

The booking remains stored in the database with its status changed to **Cancelled**.

---

# 🚉 Live Train Status

RailNova includes a dedicated Live Train Status section.

Users can access train-related status information through the application.

The feature provides a separate interface for accessing live-status functionality without affecting the ticket booking workflow.

---

# 👨‍💼 Admin Panel

RailNova provides a separate **Admin Panel** for administrators.

The Admin Panel is protected using authentication and authorization mechanisms so that regular users cannot access administrative functionality.

The Admin Dashboard provides a centralized view of the complete railway reservation system.

---

## 📊 Admin Dashboard

The dashboard displays important system information using statistics and charts.

| Dashboard Section   | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| 👥 **Users**        | Monitor registered users                        |
| 🎫 **Bookings**     | Monitor ticket bookings                         |
| 🚆 **Trains**       | View and manage train information               |
| 💰 **Revenue**      | Monitor booking revenue                         |
| 📈 **Charts**       | Visualize important system data                 |
| 📊 **Statistics**   | Get a quick overview of system activity         |
| 🔐 **Admin Access** | Restrict dashboard to authorized administrators |

---

## 📈 Admin Charts

Charts make it easier for administrators to understand application activity.

The dashboard can visually represent information such as:

* 👥 User statistics
* 🎫 Booking statistics
* 🚆 Train-related data
* 💰 Revenue information
* 📊 Overall system activity

Instead of viewing only raw numbers, administrators can use graphical representations to quickly understand trends and system performance.

---

## 🚆 Train Management

The Admin Panel also provides functionality related to train management.

Administrators can work with train records containing information such as:

* Train name
* Train number
* Source
* Destination
* Departure
* Arrival
* Fare
* Available seats

This allows the administrator to maintain the train data used by the user-facing train search and booking system.

---

# 🛡️ Security Architecture

Security has been implemented across both the frontend and backend.

| Security Layer                    | Implementation                    |
| --------------------------------- | --------------------------------- |
| 🔑 **Authentication**             | JWT-based authentication          |
| 🔒 **Password Security**          | bcrypt password hashing           |
| 📧 **Email Verification**         | OTP-based verification            |
| 🛡️ **Authentication Middleware** | Validates user tokens             |
| 👨‍💼 **Admin Authorization**     | Restricts admin functionality     |
| 🚫 **Protected APIs**             | Prevent unauthorized API access   |
| 🔐 **Environment Variables**      | Protect sensitive configuration   |
| 🌐 **CORS**                       | Controls allowed frontend origins |

---

## 🔑 JWT Authentication

After a successful login, the backend generates a JSON Web Token.

The frontend uses this token when accessing protected endpoints.

Example:

```text
👤 User Login
      ↓
🔐 Credentials Verified
      ↓
🎟️ JWT Token Generated
      ↓
💾 Token Stored
      ↓
🌐 Token Sent with API Requests
      ↓
🛡️ Backend Validates Token
      ↓
✅ Access Granted
```

This ensures that protected operations can only be performed by authenticated users.

---

## 🔒 Password Security

User passwords are not stored directly in plain text.

The application uses **bcrypt** to hash passwords before storing them in the database.

This provides an additional layer of protection for user credentials.

---

## 🛡️ Protected Routes

Authentication middleware is used to protect APIs that require a logged-in user.

Examples include:

* 🎫 Booking tickets
* 📋 Viewing personal bookings
* ❌ Cancelling tickets
* 👨‍💼 Admin operations

The backend verifies the JWT token before allowing access to protected resources.

---

## 👨‍💼 Admin Authorization

Administrative APIs are separated from normal user functionality.

Only authorized administrators can access:

* Admin Dashboard
* Admin Statistics
* Charts
* Train Management
* Administrative Operations

This prevents normal users from accessing sensitive administrative functionality.

---

# 🏗️ System Architecture

```text
                         🚆 RAILNOVA
                              │
               ┌──────────────┴──────────────┐
               │                             │
               ▼                             ▼
        👤 USER PORTAL                 👨‍💼 ADMIN PANEL
               │                             │
               │                             │
               └──────────────┬──────────────┘
                              │
                              ▼
                       🌐 REST APIs
                              │
                              ▼
                   ⚙️ NODE.JS + EXPRESS
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
       🗄️ MONGODB         🔐 AUTH          📧 EMAIL
        DATABASE          JWT + bcrypt      SERVICE
             │
             ▼
       📊 ADMIN ANALYTICS
        & CHARTS
```

---

# 🔄 Complete Booking Workflow

```text
📝 User Registration
        │
        ▼
📧 Email OTP Verification
        │
        ▼
🔑 Secure Login
        │
        ▼
🔎 Search Trains
        │
        ▼
🚆 Select Train
        │
        ▼
👤 Enter Passenger Details
        │
        ▼
🚉 Select Coach
        │
        ▼
🛏️ Select Berth Preference
        │
        ▼
💳 Simulated Payment
        │
        ▼
✅ Booking Confirmed
        │
        ├──────────────► 🧾 PNR Generated
        │
        ├──────────────► 🚉 Coach Assigned
        │
        ├──────────────► 💺 Seat Assigned
        │
        └──────────────► 📩 Email Confirmation
```

---

# 🏗️ Technology Stack

| Category                 | Technology          | Purpose                                     |
| ------------------------ | ------------------- | ------------------------------------------- |
| 🎨 **Frontend**          | HTML5               | Web page structure                          |
| 🎨 **Styling**           | CSS3                | User interface and responsive design        |
| ⚡ **Frontend Logic**     | JavaScript          | Dynamic functionality and API communication |
| ⚙️ **Backend Runtime**   | Node.js             | Server-side JavaScript runtime              |
| 🌐 **Backend Framework** | Express.js          | REST API development                        |
| 🗄️ **Database**         | MongoDB             | Application data storage                    |
| 🔗 **ODM**               | Mongoose            | MongoDB database interaction                |
| 🔐 **Authentication**    | JWT                 | Token-based authentication                  |
| 🔒 **Password Security** | bcrypt              | Password hashing                            |
| 📧 **Email**             | Email Service       | OTP and booking confirmation                |
| 🌐 **HTTP Client**       | Axios               | Backend HTTP requests                       |
| 🔄 **API Communication** | Fetch API           | Frontend-backend communication              |
| 🌍 **CORS**              | CORS Middleware     | Cross-origin request management             |
| 🔑 **Configuration**     | dotenv              | Environment variable management             |
| 📊 **Dashboard**         | Charts & Statistics | Admin data visualization                    |
| 🧪 **API Testing**       | Postman             | Testing backend APIs                        |
| 📦 **Version Control**   | Git & GitHub        | Source code management                      |

---

# 🔗 Backend API Modules

| API Endpoint          | Functionality                                  |
| --------------------- | ---------------------------------------------- |
| 🔐 `/api/auth`        | User registration, login and OTP verification  |
| 🚆 `/api/trains`      | Train search and train-related operations      |
| 🎫 `/api/bookings`    | Ticket booking, user bookings and cancellation |
| 🔎 `/api/pnr`         | PNR search and ticket status                   |
| 🚉 `/api/live-status` | Live train status functionality                |
| 👨‍💼 `/api/admin`    | Admin dashboard and administrative operations  |

---

# 📁 Project Structure

```text
RailNova/
│
├── 📁 backend/
│   │
│   ├── 📁 config/
│   │   └── db.js
│   │
│   ├── 📁 controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   └── ...
│   │
│   ├── 📁 middleware/
│   │   └── authMiddleware.js
│   │
│   ├── 📁 models/
│   │   ├── User.js
│   │   ├── Train.js
│   │   └── Booking.js
│   │
│   ├── 📁 routes/
│   │   ├── authRoutes.js
│   │   ├── trainRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── pnrRoutes.js
│   │   ├── liveStatusRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── 📁 utils/
│   │   └── sendEmail.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── 📁 frontend/
│   │
│   ├── 📄 index.html
│   ├── 📄 login.html
│   ├── 📄 signup.html
│   ├── 📄 train-search.html
│   ├── 📄 book-ticket.html
│   ├── 📄 payment.html
│   ├── 📄 ticket.html
│   ├── 📄 pnr.html
│   ├── 📄 live-status.html
│   ├── 📄 admin.html
│   │
│   ├── 📁 css/
│   └── 📁 js/
│
├── 📄 README.md
└── 📄 .gitignore
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/SANYAM-MANIT/RailNova.git
```

## 2️⃣ Navigate to Project

```bash
cd RailNova
```

## 3️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

## 4️⃣ Configure Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Keep sensitive values private and never commit the `.env` file to GitHub.

## 5️⃣ Start Backend

```bash
npm start
```

The backend will start on:

```text
https://railnova.onrender.com
```

## 6️⃣ Run Frontend

Open the `frontend` folder using a local development server such as **VS Code Live Server**.

The frontend communicates with the Node.js and Express backend through REST APIs.

---

# 🔒 Environment Variables

RailNova uses environment variables to protect sensitive configuration.

The `.gitignore` file should contain:

```text
node_modules/
.env
```

The following information should remain private:

* 🔐 MongoDB connection string
* 🔑 JWT secret
* 📧 Email credentials
* 🔒 API keys
* ⚙️ Server configuration

---

# 📚 Project Learning Outcomes

Building RailNova provided practical experience in developing a complete full-stack application.

### 💻 Frontend Development

* HTML and CSS based UI development
* JavaScript DOM manipulation
* Form handling
* Local storage
* API integration
* Dynamic page updates

### ⚙️ Backend Development

* Node.js server development
* Express.js REST APIs
* Middleware implementation
* Controller and route architecture
* Error handling
* CORS configuration

### 🗄️ Database Management

* MongoDB database design
* Mongoose models
* CRUD operations
* User and booking relationships
* Train availability management

### 🔐 Security

* JWT authentication
* Password hashing
* OTP verification
* Protected routes
* Authentication middleware
* Admin authorization
* Environment variable management

### 📊 Admin & Analytics

* Admin dashboard development
* System statistics
* Data visualization
* Charts
* Train management
* Booking monitoring

### 🌐 Real-World Application Concepts

* Railway reservation workflow
* Ticket lifecycle
* PNR generation
* Coach and seat allocation
* Payment workflow
* Email notification system
* Ticket cancellation

---

# 👨‍💻 Developer

### **Sanyam Jain**

🎓 **B.Tech – Computer Science & Engineering**
🏫 **MANIT Bhopal**

Interested in:

> 💻 Full-Stack Web Development
> ⚙️ Backend Development
> 🔐 Web Security
> 🧠 Data Structures & Algorithms

### 🔗 GitHub

👉 **https://github.com/SANYAM-MANIT**

---

<p align="center">

# 🚆 RailNova

### Your Journey Begins Here ❤️

**Built with ❤️ by Sanyam Jain | MANIT Bhopal**

</p>
