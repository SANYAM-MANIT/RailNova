const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {

    bookTicket,

    getMyBookings,

    cancelBooking,

    getBookingByPNR

} = require("../controllers/bookingController");

router.post("/book", auth, bookTicket);

router.get("/my", auth, getMyBookings);

router.put("/cancel/:id", auth, cancelBooking);

router.get("/pnr/:pnr", getBookingByPNR);

module.exports = router;