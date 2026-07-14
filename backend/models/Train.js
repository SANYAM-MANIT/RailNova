const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({

    trainNumber:{
        type:String,
        required:true,
        unique:true
    },

    trainName:{
        type:String,
        required:true
    },

    from:{
        type:String,
        required:true
    },

    to:{
        type:String,
        required:true
    },

    departure:{
        type:String,
        required:true
    },

    arrival:{
        type:String,
        required:true
    },

    duration:{
        type:String,
        required:true
    },

    totalSeats:{
        type:Number,
        required:true
    },

    availableSeats:{
        type:Number,
        required:true
    },

    fare:{
        type:Number,
        required:true
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Train",trainSchema);