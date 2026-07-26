const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const Train = require("./models/Train");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("⚡ MongoDB Connected...");

    const trainsFilePath = path.join(__dirname, "data", "trains.json");
    
    let trainsData = [];
    if (fs.existsSync(trainsFilePath)) {
        trainsData = JSON.parse(fs.readFileSync(trainsFilePath, "utf-8"));
    }

    if (!trainsData || trainsData.length === 0) {
        console.error("❌ No train data found in backend/data/trains.json! Run `node generateTrains.js` first.");
        process.exit(1);
    }

    await Train.deleteMany({});
    console.log("🗑️ Cleared existing train records.");

    await Train.insertMany(trainsData);
    console.log(`✅ Successfully seeded ${trainsData.length} Indian Trains into MongoDB Atlas!`);

    process.exit(0);
})
.catch(err => {
    console.error("❌ Error seeding trains:", err);
    process.exit(1);
});