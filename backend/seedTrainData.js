const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Train = require("./models/Train");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    console.log("MongoDB Connected");

    await Train.deleteMany();

    await Train.insertMany([

        {
            trainNumber:"12951",
            trainName:"Mumbai Rajdhani Express",
            from:"Delhi",
            to:"Mumbai",
            departure:"16:55",
            arrival:"08:35",
            duration:"15h 40m",
            availableSeats:82
        },

        {
            trainNumber:"12953",
            trainName:"August Kranti Rajdhani",
            from:"Delhi",
            to:"Mumbai",
            departure:"17:15",
            arrival:"09:45",
            duration:"16h 30m",
            availableSeats:45
        },

        {
            trainNumber:"22221",
            trainName:"CSMT Rajdhani",
            from:"Mumbai",
            to:"Delhi",
            departure:"16:20",
            arrival:"08:15",
            duration:"15h 55m",
            availableSeats:71
        },

        {
            trainNumber:"12001",
            trainName:"Bhopal Shatabdi",
            from:"Delhi",
            to:"Bhopal",
            departure:"06:00",
            arrival:"14:25",
            duration:"8h 25m",
            availableSeats:65
        },

        {
            trainNumber:"12002",
            trainName:"Shatabdi Express",
            from:"Bhopal",
            to:"Delhi",
            departure:"15:30",
            arrival:"23:50",
            duration:"8h 20m",
            availableSeats:50
        },

        {
            trainNumber:"22436",
            trainName:"Vande Bharat Express",
            from:"Delhi",
            to:"Varanasi",
            departure:"06:00",
            arrival:"14:00",
            duration:"8h",
            availableSeats:98
        },

        {
            trainNumber:"22435",
            trainName:"Vande Bharat Express",
            from:"Varanasi",
            to:"Delhi",
            departure:"15:00",
            arrival:"23:00",
            duration:"8h",
            availableSeats:77
        },

        {
            trainNumber:"12627",
            trainName:"Karnataka Express",
            from:"Delhi",
            to:"Bengaluru",
            departure:"20:20",
            arrival:"08:40",
            duration:"36h 20m",
            availableSeats:110
        },

        {
            trainNumber:"12628",
            trainName:"Karnataka Express",
            from:"Bengaluru",
            to:"Delhi",
            departure:"19:20",
            arrival:"07:10",
            duration:"35h 50m",
            availableSeats:95
        },

        {
            trainNumber:"12925",
            trainName:"Paschim Express",
            from:"Mumbai",
            to:"Amritsar",
            departure:"11:25",
            arrival:"18:30",
            duration:"31h 05m",
            availableSeats:84
        }

    ]);

    console.log("Train Data Inserted Successfully");

    process.exit();

})
.catch(err=>{

    console.log(err);

});