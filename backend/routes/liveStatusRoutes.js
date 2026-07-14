const express = require("express");

const router = express.Router();

const {

    getLiveStatus

} = require("../controllers/liveStatusController");

router.get("/:trainNumber", getLiveStatus);

module.exports = router;