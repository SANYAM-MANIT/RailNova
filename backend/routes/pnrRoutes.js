const express = require("express");

const router = express.Router();

const {

    getPNRStatus

} = require("../controllers/pnrController");

router.get("/:pnr", getPNRStatus);

module.exports = router;