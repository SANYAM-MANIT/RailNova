const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes"); 
const trainRoutes=require("./routes/trainRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const liveStatusRoutes = require("./routes/liveStatusRoutes");
const pnrRoutes = require("./routes/pnrRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
// console.log(process.env.EMAIL_USER);
// console.log(process.env.EMAIL_PASS);
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api/trains",trainRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/live-status", liveStatusRoutes);

app.use("/api/pnr", pnrRoutes);

app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
    res.send("🚆 RailNova Backend is Running...");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});