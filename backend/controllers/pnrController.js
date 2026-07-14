const Booking = require("../models/Booking");

const getPNRStatus = async (req, res) => {

    try {

        const { pnr } = req.params;

        const booking = await Booking.findOne({

            pnr

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

    getPNRStatus

};