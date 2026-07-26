const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(

    {

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        trainId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Train",

            required: true

        },

        trainName: {

            type: String,

            required: true

        },

        trainNumber: {

            type: String,

            required: true

        },

        from: {

            type: String,

            required: true

        },

        to: {

            type: String,

            required: true

        },

        departure: {

            type: String

        },

        arrival: {

            type: String

        },

        fare: {

            type: Number

        },

        originalFare: {
            type: Number
        },
        
        discount: {
            type: Number,
            default: 0
        },
        
        concessionType: {
            type: String,
            default: "None"
        },

        quota: {
            type: String,
            enum: ["General", "Tatkal", "Premium Tatkal"],
            default: "General"
        },

        tatkalCharges: {
            type: Number,
            default: 0
        },

        passengerName: {

            type: String,

            required: true

        },

        age: {

            type: Number,

            required: true

        },

        gender: {

            type: String,

            required: true

        },

        passengers: [
            {
                name: { type: String, required: true },
                age: { type: Number, required: true },
                gender: { type: String, required: true },
                berth: { type: String },
                concessionType: { type: String, default: "None" },
                discount: { type: Number, default: 0 },
                coachNumber: { type: String },
                seatNumber: { type: Number }
            }
        ],

        coach: {

            type: String,

            required: true

        },

        coachNumber: {

            type: String

        },

        seatNumber: {

            type: Number

        },

        berth: {

            type: String

        },

        journeyDate: {

            type: String

        },

        mobile: {

            type: String,

            required: true

        },

        email: {

            type: String,

            required: true

        },

        paymentMethod: {

            type: String,

            default: "UPI"

        },

        transactionId: {

            type: String

        },

        paymentStatus: {

            type: String,

            default: "SUCCESS"

        },

        bookingTime: {

            type: String

        },

        pnr: {

            type: String,

            unique: true

        },

        status: {

            type: String,

            enum: [

                "Confirmed",

                "Cancelled"

            ],

            default: "Confirmed"

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model("Booking", bookingSchema);