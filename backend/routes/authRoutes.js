const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {

    signup,

    verifyOTP,

    resendOTP,

    forgotPassword,

    verifyForgotOTP,

    resetPassword,

    login,

    getProfile,

    updateProfile,

    changePassword,

    deleteAccount

} = require("../controllers/authController");

router.post("/signup", signup);

router.post("/verify-otp", verifyOTP);

router.post("/resend-otp", resendOTP);

router.post("/forgot-password", forgotPassword);

router.post("/verify-forgot-otp", verifyForgotOTP);

router.post("/reset-password", resetPassword);

router.post("/login", login);

router.get("/profile", auth, getProfile);

router.put("/update-profile", auth, updateProfile);

router.put("/change-password", auth, changePassword);

router.delete("/delete-account", auth, deleteAccount);

module.exports = router;