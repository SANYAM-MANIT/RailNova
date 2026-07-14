const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {

    getDashboard,

    addTrain,

    getAllTrains,

    deleteTrain,

    updateTrain,

    getAllUsers,

    getAllBookings


} = require("../controllers/adminController");

const {
    getAnalytics
} = require("../controllers/analyticsController");

router.get(

    "/dashboard",

    auth,

    admin,

    getDashboard

);

router.post(

    "/add-train",

    auth,

    admin,

    addTrain

);

router.get(

    "/trains",

    auth,

    admin,

    getAllTrains

);

router.delete(

    "/train/:id",
    
    auth,
    
    admin,
    
    deleteTrain
    
    );

    router.put(

        "/train/:id",
        
        auth,
        
        admin,
        
        updateTrain
        
        );    

        router.get(

            "/users",
        
            auth,
        
            admin,
        
            getAllUsers
        
        );

        router.get(

            "/bookings",
        
            auth,
        
            admin,
        
            getAllBookings
        
        );

        router.get(
            "/analytics",
            auth,
            admin,
            getAnalytics
        );
module.exports = router;