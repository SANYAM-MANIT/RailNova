const mongoose = require("mongoose");

const liveStatusSchema = new mongoose.Schema({

    trainNumber: {

        type: String,

        required: true,

        unique: true

    },

    trainName: {

        type: String,

        required: true

    },

    currentStation: {

        type: String,

        required: true

    },

    nextStation: {

        type: String,

        required: true

    },

    delay: {

        type: String,

        required: true

    },

    updatedAt: {

        type: String,

        required: true

    }

});

module.exports = mongoose.model("LiveStatus", liveStatusSchema);