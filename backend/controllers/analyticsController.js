const User = require("../models/User");
const Train = require("../models/Train");
const Booking = require("../models/Booking");

const getAnalytics = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalTrains = await Train.countDocuments();

        const totalBookings = await Booking.countDocuments();

        const confirmedBookings = await Booking.countDocuments({
            status: "Confirmed"
        });

        const cancelledBookings = await Booking.countDocuments({
            status: "Cancelled"
        });

        const revenue = await Booking.aggregate([
            {
                $match: {
                    status: "Confirmed"
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$fare"
                    }
                }
            }
        ]);

        const totalRevenue = revenue.length ? revenue[0].total : 0;

        const today = new Date();
        today.setHours(0,0,0,0);

        const todayBookings = await Booking.countDocuments({
            createdAt: {
                $gte: today
            }
        });

        const popularRoutes = await Booking.aggregate([

            {
                $group:{
                    _id:{
                        from:"$from",
                        to:"$to"
                    },
                    count:{
                        $sum:1
                    }
                }
            },

            {
                $sort:{
                    count:-1
                }
            },

            {
                $limit:5
            }

        ]);

        const recentBookings = await Booking.find()

            .sort({createdAt:-1})

            .limit(5)

            .select(
                "passengerName trainName fare status createdAt"
            );

        res.json({

            totalUsers,

            totalTrains,

            totalBookings,

            confirmedBookings,

            cancelledBookings,

            totalRevenue,

            todayBookings,

            popularRoutes,

            recentBookings

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Server Error"

        });

    }

};

module.exports = {

    getAnalytics

};