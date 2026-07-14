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

        await sendEmail(

            email,
        
            `🎫 Booking Confirmed | PNR ${booking.pnr} | RailNova`,
        
`
<div style="max-width:700px;margin:auto;font-family:Arial,sans-serif;background:#f4f8ff;padding:30px;">

    <div style="background:#2563eb;color:white;padding:25px;border-radius:15px 15px 0 0;text-align:center;">

        <h1 style="margin:0;">🚆 RailNova</h1>

        <p style="margin-top:8px;font-size:16px;">
            Your Journey Begins Here
        </p>

    </div>

    <div style="background:white;padding:30px;border-radius:0 0 15px 15px;">

        <h2 style="color:#16a34a;margin-top:0;">
            ✅ Booking Confirmed
        </h2>

        <p>
            Hello <b>${passengerName}</b>,
        </p>

        <p>
            Your train ticket has been booked successfully.
        </p>

        <table style="width:100%;border-collapse:collapse;margin-top:20px;">

            <tr>
                <td style="padding:10px;"><b>PNR</b></td>
                <td style="padding:10px;">${booking.pnr}</td>
            </tr>

            <tr style="background:#f8fafc;">
                <td style="padding:10px;"><b>Train</b></td>
                <td style="padding:10px;">
                    ${booking.trainName}
                    (${booking.trainNumber})
                </td>
            </tr>

            <tr>
                <td style="padding:10px;"><b>From</b></td>
                <td style="padding:10px;">${booking.from}</td>
            </tr>

            <tr style="background:#f8fafc;">
                <td style="padding:10px;"><b>To</b></td>
                <td style="padding:10px;">${booking.to}</td>
            </tr>

            <tr>
                <td style="padding:10px;"><b>Date</b></td>
                <td style="padding:10px;">${booking.journeyDate}</td>
            </tr>

            <tr style="background:#f8fafc;">
                <td style="padding:10px;"><b>Departure</b></td>
                <td style="padding:10px;">${booking.departure}</td>
            </tr>

            <tr>
                <td style="padding:10px;"><b>Arrival</b></td>
                <td style="padding:10px;">${booking.arrival}</td>
            </tr>

            <tr style="background:#f8fafc;">
                <td style="padding:10px;"><b>Coach</b></td>
                <td style="padding:10px;">${booking.coachNumber}</td>
            </tr>

            <tr>
                <td style="padding:10px;"><b>Seat</b></td>
                <td style="padding:10px;">${booking.seatNumber}</td>
            </tr>

            <tr style="background:#f8fafc;">
                <td style="padding:10px;"><b>Berth</b></td>
                <td style="padding:10px;">${booking.berth}</td>
            </tr>

            <tr>
                <td style="padding:10px;"><b>Passenger</b></td>
                <td style="padding:10px;">${booking.passengerName}</td>
            </tr>

            <tr style="background:#f8fafc;">
                <td style="padding:10px;"><b>Fare Paid</b></td>
                <td style="padding:10px;font-weight:bold;color:#2563eb;">
                    ₹${booking.fare}
                </td>
            </tr>

            <tr>
                <td style="padding:10px;"><b>Payment</b></td>
                <td style="padding:10px;color:green;">
                    ${booking.paymentStatus}
                </td>
            </tr>

        </table>

        <div style="margin-top:30px;padding:18px;background:#fff8e6;border-left:5px solid #f59e0b;border-radius:10px;">

            <b>Important</b><br><br>

            Please carry a valid Government-issued Photo ID during your journey.

        </div>

        <div style="text-align:center;margin-top:35px;">

            <h3 style="color:#2563eb;margin-bottom:10px;">
                Thank you for choosing RailNova ❤️
            </h3>

            <p style="color:#666;">
                We wish you a safe and pleasant journey.
            </p>

        </div>

    </div>

    <hr style="margin:30px 0">

<p style="font-size:13px;color:#777;text-align:center;line-height:1.8;">

© 2026 RailNova. All Rights Reserved.<br>

Designed & Developed by
<a href="https://github.com/SANYAM-MANIT"
style="color:#2563eb;text-decoration:none;font-weight:bold;">
Sanyam Jain
</a>.<br>

This is an automatically generated email.

</p>

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