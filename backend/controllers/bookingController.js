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
            paymentMethod,
            quota,
            tatkalCharges,
            passengers: incomingPassengers

        } = req.body;

        const train = await Train.findById(trainId);

        if (!train) {

            return res.status(404).json({
                message: "Train not found"
            });

        }

        // Determine passenger list (support multi-passenger group bookings)
        let passengerList = [];
        if (Array.isArray(incomingPassengers) && incomingPassengers.length > 0) {
            passengerList = incomingPassengers;
        } else {
            passengerList = [{ name: passengerName, age: Number(age), gender, berth }];
        }

        const passCount = passengerList.length;

        if (train.availableSeats < passCount) {

            return res.status(400).json({
                message: `Not enough seats available! Only ${train.availableSeats} seat(s) remaining.`
            });

        }

        train.availableSeats -= passCount;

        await train.save();

        const assignedCoach = generateCoach(coach);
        const startSeat = generateSeat();

        const assignedPassengers = passengerList.map((p, idx) => ({
            name: p.name,
            age: Number(p.age),
            gender: p.gender,
            berth: p.berth || berth || "Lower",
            concessionType: p.concessionType || "None",
            discount: p.discount || 0,
            coachNumber: assignedCoach,
            seatNumber: ((startSeat + idx - 1) % 72) + 1
        }));

        const primaryPassenger = assignedPassengers[0];

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

            quota: quota || "General",

            tatkalCharges: tatkalCharges || 0,

            journeyDate: new Date().toLocaleDateString("en-GB"),

            passengerName: primaryPassenger.name,

            age: primaryPassenger.age,

            gender: primaryPassenger.gender,

            passengers: assignedPassengers,

            coach,

            coachNumber: assignedCoach,

            seatNumber: primaryPassenger.seatNumber,

            berth: primaryPassenger.berth,

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
        const passengerRows = (booking.passengers && booking.passengers.length > 0)
            ? booking.passengers.map((p, idx) => `
                <tr style="background:${idx % 2 === 0 ? '#f8fafc' : '#ffffff'};">
                    <td style="padding:8px;border:1px solid #cbd5e1;text-align:center;">${idx + 1}</td>
                    <td style="padding:8px;border:1px solid #cbd5e1;"><b>${p.name}</b> (${p.age}, ${p.gender})</td>
                    <td style="padding:8px;border:1px solid #cbd5e1;">${p.coachNumber || booking.coachNumber}-${p.seatNumber}</td>
                    <td style="padding:8px;border:1px solid #cbd5e1;">${p.berth}</td>
                    <td style="padding:8px;border:1px solid #cbd5e1;">${p.concessionType || 'None'}</td>
                </tr>
            `).join('')
            : `
                <tr>
                    <td style="padding:8px;border:1px solid #cbd5e1;text-align:center;">1</td>
                    <td style="padding:8px;border:1px solid #cbd5e1;"><b>${booking.passengerName}</b> (${booking.age}, ${booking.gender})</td>
                    <td style="padding:8px;border:1px solid #cbd5e1;">${booking.coachNumber}-${booking.seatNumber}</td>
                    <td style="padding:8px;border:1px solid #cbd5e1;">${booking.berth}</td>
                    <td style="padding:8px;border:1px solid #cbd5e1;">${booking.concessionType || 'None'}</td>
                </tr>
            `;

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
        
                    <p>Your train ticket for <b>${booking.passengers ? booking.passengers.length : 1} Passenger(s)</b> has been booked successfully.</p>
        
                    <hr>
        
                    <h3 style="color:#2563eb;">Journey Details</h3>
        
                    <p><b>PNR:</b> ${booking.pnr}</p>
        
                    <p><b>Train:</b> ${booking.trainName} (${booking.trainNumber})</p>
        
                    <p><b>Route:</b> ${booking.from} ➜ ${booking.to}</p>
        
                    <p><b>Journey Date:</b> ${booking.journeyDate}</p>
        
                    <p><b>Departure:</b> ${booking.departure}</p>
        
                    <p><b>Arrival:</b> ${booking.arrival}</p>
        
                    <hr>
        
                    <h3 style="color:#2563eb;">Passenger Details (${booking.passengers ? booking.passengers.length : 1} Passenger/s)</h3>
        
                    <table style="width:100%;border-collapse:collapse;margin-top:10px;text-align:left;font-size:13px;border:1px solid #cbd5e1;">
                        <thead>
                            <tr style="background:#2563eb;color:white;">
                                <th style="padding:8px;border:1px solid #2563eb;text-align:center;">#</th>
                                <th style="padding:8px;border:1px solid #2563eb;">Passenger</th>
                                <th style="padding:8px;border:1px solid #2563eb;">Coach & Seat</th>
                                <th style="padding:8px;border:1px solid #2563eb;">Berth</th>
                                <th style="padding:8px;border:1px solid #2563eb;">Concession</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${passengerRows}
                        </tbody>
                    </table>
        
                    <hr style="margin-top:20px;">
        
                    <h3 style="color:#2563eb;">Payment Summary</h3>
        
                    <p><b>Original Fare:</b> ₹${booking.originalFare || booking.fare}</p>

                    <p><b>Discount:</b> -₹${booking.discount || 0}</p>

                    <p><b>Total Fare Paid:</b> ₹${booking.fare}</p>
        
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

            const seatsToRestore = (booking.passengers && booking.passengers.length > 0) ? booking.passengers.length : 1;

            train.availableSeats += seatsToRestore;

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