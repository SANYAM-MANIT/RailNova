const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const trainRoutes = require("./routes/trainRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const liveStatusRoutes = require("./routes/liveStatusRoutes");
const pnrRoutes = require("./routes/pnrRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 8080;

// CORS
app.use(cors({
    origin: [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "https://rail-nova-sanyam.vercel.app"
    ],
    credentials: true
}));

// JSON
app.use(express.json());

// Routes
app.use("/api/trains", trainRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/live-status", liveStatusRoutes);

app.use("/api/pnr", pnrRoutes);

app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("🚆 RailNova Backend is Running...");
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});