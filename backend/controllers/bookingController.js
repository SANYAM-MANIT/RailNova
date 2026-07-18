const Booking = require("../models/Booking");
const Train = require("../models/Train");
const sendEmail = require("../utils/sendEmail");

const generatePNR = () => {

    let pnr = "";

    for (let i = 0; i < 10; i++) {

        pnr += Math.floor(Math.random() * 10);

    }

    return pnr;

};

const generateCoach = (coachType) => {

    if (coachType === "Sleeper") {

        return "S" + (Math.floor(Math.random() * 10) + 1);

    }

    if (coachType === "3A") {

        return "B" + (Math.floor(Math.random() * 5) + 1);

    }

    if (coachType === "2A") {

        return "A" + (Math.floor(Math.random() * 3) + 1);

    }

    if (coachType === "1A") {

        return "H1";

    }

    return "C" + (Math.floor(Math.random() * 3) + 1);

};

const generateSeat = () => {

    return Math.floor(Math.random() * 72) + 1;

};

const bookTicket = async (req, res) => {

    try {

        const {

            trainId,
            passengerName,
            age,
            gender,
            coach,
            berth,
            mobile,
            email,
            fare,
            originalFare,
            discount,
            concessionType,
            paymentMethod

        } = req.body;

        const train = await Train.findById(trainId);

        if (!train) {

            return res.status(404).json({
                message: "Train not found"
            });

        }

        if (train.availableSeats <= 0) {

            return res.status(400).json({
                message: "No seats available"
            });

        }

        train.availableSeats--;

        await train.save();

        const booking = await Booking.create({

            userId: req.user.id,

            trainId: train._id,

            trainName: train.trainName,

            trainNumber: train.trainNumber,

            from: train.from,

            to: train.to,

            departure: train.departure,

            arrival: train.arrival,

            fare: fare,

            originalFare: originalFare,

            discount: discount,

            concessionType: concessionType,

            journeyDate: new Date().toLocaleDateString("en-GB"),

            passengerName,

            age,

            gender,

            coach,

            coachNumber: generateCoach(coach),

            seatNumber: generateSeat(),

            berth,

            mobile,

            email,

            paymentMethod: paymentMethod || "UPI",

            paymentStatus: "SUCCESS",

            transactionId:
                "TXN" +
                Date.now() +
                Math.floor(Math.random() * 1000),

            bookingTime: new Date().toLocaleString(),

            pnr: generatePNR(),

            status: "Confirmed"

        });

        console.log("========== BOOKING ==========");
        console.log("Email from frontend:", email);
        console.log("Booking email:", booking.email);
        console.log("=============================");
        await sendEmail(

            email,
        
            `🎫 RailNova Ticket Confirmed | PNR ${booking.pnr}`,
        
            `
            <div style="max-width:650px;margin:auto;font-family:Arial,sans-serif;background:#f4f8ff;padding:20px;">
        
                <div style="background:#2563eb;color:white;padding:20px;text-align:center;border-radius:10px 10px 0 0;">
        
                    <h1 style="margin:0;">🚆 RailNova</h1>
        
                    <p style="margin-top:8px;">
                        Your Journey Begins Here
                    </p>
        
                </div>
        
                <div style="background:white;padding:25px;border-radius:0 0 10px 10px;">
        
                    <h2 style="color:#16a34a;">
                        ✅ Booking Confirmed
                    </h2>
        
                    <p>Hello <b>${booking.passengerName}</b>,</p>
        
                    <p>Your train ticket has been booked successfully.</p>
        
                    <hr>
        
                    <h3 style="color:#2563eb;">Journey Details</h3>
        
                    <p><b>PNR:</b> ${booking.pnr}</p>
        
                    <p><b>Train:</b> ${booking.trainName} (${booking.trainNumber})</p>
        
                    <p><b>Route:</b> ${booking.from} ➜ ${booking.to}</p>
        
                    <p><b>Journey Date:</b> ${booking.journeyDate}</p>
        
                    <p><b>Departure:</b> ${booking.departure}</p>
        
                    <p><b>Arrival:</b> ${booking.arrival}</p>
        
                    <hr>
        
                    <h3 style="color:#2563eb;">Passenger Details</h3>
        
                    <p><b>Name:</b> ${booking.passengerName}</p>
        
                    <p><b>Age:</b> ${booking.age}</p>
        
                    <p><b>Gender:</b> ${booking.gender}</p>
        
                    <p><b>Coach:</b> ${booking.coachNumber}</p>
        
                    <p><b>Seat:</b> ${booking.seatNumber}</p>
        
                    <p><b>Berth:</b> ${booking.berth}</p>
        
                    <hr>
        
                    <h3 style="color:#2563eb;">Payment</h3>
        
                    <p><b>Fare Paid:</b> ₹${booking.fare}</p>
        
                    <p><b>Status:</b>
                        <span style="color:green;font-weight:bold;">
                            ${booking.paymentStatus}
                        </span>
                    </p>
        
                    <p><b>Transaction ID:</b> ${booking.transactionId}</p>
        
                    <div style="margin-top:25px;padding:15px;background:#fff8dc;border-left:4px solid orange;border-radius:6px;">
        
                        <b>Travel Reminder</b>
        
                        <p style="margin-top:10px;">
                            Please carry a valid Government Photo ID during your journey.
                        </p>
        
                    </div>
        
                    <div style="margin-top:30px;text-align:center;">
        
                        <h3 style="color:#2563eb;">
                            Thank you for choosing RailNova ❤️
                        </h3>
        
                        <p>Have a safe and pleasant journey!</p>
        
                    </div>
        
                </div>
        
                <div style="text-align:center;color:#777;font-size:13px;margin-top:20px;line-height:1.8;">
        
                    © 2026 RailNova. All Rights Reserved.<br>
        
                    Designed & Developed by
                    <a href="https://github.com/SANYAM-MANIT"
                       style="color:#2563eb;text-decoration:none;font-weight:bold;">
                       Sanyam Jain
                    </a>
        
                </div>
        
            </div>
            `
        
        );

        res.status(201).json({

            message: "Booking Successful",

            booking

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

const getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({

            userId: req.user.id

        }).sort({

            createdAt: -1

        });

        res.status(200).json(bookings);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const cancelBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {

            return res.status(404).json({

                message: "Booking not found"

            });

        }

        if (booking.status === "Cancelled") {

            return res.status(400).json({

                message: "Ticket already cancelled"

            });

        }

        const train = await Train.findById(booking.trainId);

        if (train) {

            train.availableSeats++;

            await train.save();

        }

        booking.status = "Cancelled";

        await booking.save();

        res.status(200).json({

            message: "Ticket Cancelled Successfully"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const getBookingByPNR = async (req, res) => {

    try {

        const booking = await Booking.findOne({

            pnr: req.params.pnr

        });

        if (!booking) {

            return res.status(404).json({

                message: "PNR Not Found"

            });

        }

        res.status(200).json(booking);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};
module.exports = {

    bookTicket,

    getMyBookings,

    cancelBooking,

    getBookingByPNR

};