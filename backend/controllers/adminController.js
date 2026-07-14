const User = require("../models/User");

const Train = require("../models/Train");

const Booking = require("../models/Booking");

const getDashboard = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalTrains = await Train.countDocuments();

        const totalBookings = await Booking.countDocuments();

        const cancelledBookings = await Booking.countDocuments({

            status: "Cancelled"

        });

        res.json({

            totalUsers,

            totalTrains,

            totalBookings,

            cancelledBookings

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const addTrain = async (req, res) => {

    try {

        const {

            trainName,
            trainNumber,
            from,
            to,
            departure,
            arrival,
            totalSeats,
            fare

        } = req.body;

        const exists = await Train.findOne({

            trainNumber

        });

        if (exists) {

            return res.status(400).json({

                message: "Train already exists"

            });

        }

        let dep = departure.split(":").map(Number);

        let arr = arrival.split(":").map(Number);

        let depMinutes = dep[0] * 60 + dep[1];

        let arrMinutes = arr[0] * 60 + arr[1];

        if (arrMinutes < depMinutes) {

            arrMinutes += 24 * 60;

        }

        let diff = arrMinutes - depMinutes;

        let hours = Math.floor(diff / 60);

        let minutes = diff % 60;

        const duration = `${hours}h ${minutes}m`;

        const train = await Train.create({

            trainName,
            trainNumber,
            from,
            to,
            departure,
            arrival,
            duration,
            totalSeats,
            availableSeats: totalSeats,
            fare

        });

        res.status(201).json({

            message: "Train Added Successfully",

            train

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const getAllTrains = async (req, res) => {

    try {

        const trains = await Train.find().sort({

            createdAt: -1

        });

        res.status(200).json(trains);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const deleteTrain = async (req,res)=>{

    try{

        await Train.findByIdAndDelete(req.params.id);

        res.json({

            message:"Train Deleted"

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Server Error"

        });

    }

};

const updateTrain = async (req, res) => {

    try {

        const {

            trainName,
            from,
            to,
            departure,
            arrival,
            totalSeats,
            fare

        } = req.body;

        let dep = departure.split(":").map(Number);

        let arr = arrival.split(":").map(Number);

        let depMinutes = dep[0] * 60 + dep[1];

        let arrMinutes = arr[0] * 60 + arr[1];

        if (arrMinutes < depMinutes) {

            arrMinutes += 24 * 60;

        }

        const diff = arrMinutes - depMinutes;

        const duration =
            `${Math.floor(diff/60)}h ${diff%60}m`;

        const train = await Train.findByIdAndUpdate(

            req.params.id,

            {

                trainName,
                from,
                to,
                departure,
                arrival,
                duration,
                totalSeats,
                availableSeats: totalSeats,
                fare

            },

            {

                new:true

            }

        );

        res.json(train);

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Server Error"

        });

    }

};


const getAllUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.status(200).json(users);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


const getAllBookings = async (req,res)=>{

    try{

        const bookings = await Booking.find().sort({

            createdAt:-1

        });

        res.status(200).json(bookings);

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Server Error"

        });

    }

};

module.exports = {

    getDashboard,

    addTrain,

    getAllTrains,

    deleteTrain,

    updateTrain,

    getAllUsers,

    getAllBookings

};