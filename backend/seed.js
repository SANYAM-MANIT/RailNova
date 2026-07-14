const mongoose = require("mongoose");
require("dotenv").config();

const Train = require("./models/Train");
const trains = require("./data/trains.json");

mongoose.connect(process.env.MONGO_URI)
.then(async()=>{

    await Train.deleteMany({});

    await Train.insertMany(trains);

    console.log("✅ 300 Trains Inserted Successfully");

    process.exit();

})
.catch(err=>console.log(err));