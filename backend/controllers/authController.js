const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const PendingUser = require("../models/PendingUser");
const sendEmail = require("../utils/sendEmail");

const generateOTP = () => {

    return Math.floor(100000 + Math.random() * 900000).toString();

};

const sendOTPEmail = async (email, otp) => {

    await sendEmail(

        email,

        "RailNova Email Verification",

        `
        <div style="font-family:Poppins,Arial,sans-serif">

            <h2>Welcome to RailNova 🚆</h2>

            <p>Your OTP for email verification is:</p>

            <h1 style="letter-spacing:5px;color:#2563eb">
                ${otp}
            </h1>

            <p>This OTP is valid for <b>10 minutes</b>.</p>

            <p>Please do not share it with anyone.</p>

        </div>
        `

    );

};

const signup = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({

                message: "All fields are required"

            });

        }

        if (!validator.isEmail(email)) {

            return res.status(400).json({

                message: "Please enter a valid email."

            });

        }

        if (password.length < 6) {

            return res.status(400).json({

                message: "Password must be at least 6 characters."

            });

        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                message: "Email already registered."

            });

        }

        const otp = generateOTP();

        const hashedPassword = await bcrypt.hash(password, 10);

        await PendingUser.findOneAndDelete({ email });

        await PendingUser.create({

            name,

            email,

            password: hashedPassword,

            otp,

            otpExpiry: new Date(Date.now() + 10 * 60 * 1000)

        });

        await sendOTPEmail(email, otp);

        res.status(200).json({

            message: "OTP sent to your email. Please verify your account."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const pendingUser = await PendingUser.findOne({ email });

        if (!pendingUser) {

            return res.status(400).json({

                message: "No pending signup found."

            });

        }

        if (pendingUser.otp !== otp) {

            return res.status(400).json({

                message: "Invalid OTP."

            });

        }

        if (pendingUser.otpExpiry < new Date()) {

            return res.status(400).json({

                message: "OTP has expired."

            });

        }

        await User.create({

            name: pendingUser.name,

            email: pendingUser.email,

            password: pendingUser.password

        });

        await PendingUser.deleteOne({ email });

        res.status(201).json({

            success: true,

            message: "Email verified successfully."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                message: "No account found with this email."

            });

        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        user.resetOtp = otp;

        user.otpExpiry = new Date(
            Date.now() + 5 * 60 * 1000
        );

        await user.save();

        await sendEmail(

            email,

            "RailNova Password Reset OTP",

            `
                <h2>Reset Password</h2>

                <p>Your OTP is:</p>

                <h1>${otp}</h1>

                <p>This OTP is valid for 5 minutes.</p>
            `

        );

        res.status(200).json({

            message: "OTP sent successfully."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const verifyForgotOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                message: "User not found."

            });

        }

        if (user.resetOtp !== otp) {

            return res.status(400).json({

                message: "Invalid OTP."

            });

        }

        if (user.otpExpiry < new Date()) {

            return res.status(400).json({

                message: "OTP has expired."

            });

        }

        res.status(200).json({

            message: "OTP Verified Successfully."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const resetPassword = async (req, res) => {

    try {

        const { email, newPassword } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                message: "User not found."

            });

        }

        user.password = await bcrypt.hash(newPassword, 10);

        user.resetOtp = null;

        user.otpExpiry = null;

        await user.save();

        res.status(200).json({

            message: "Password reset successful."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const resendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        const pendingUser = await PendingUser.findOne({ email });

        if (!pendingUser) {

            return res.status(404).json({
                message: "No pending signup found."
            });

        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        pendingUser.otp = otp;

        pendingUser.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        await pendingUser.save();

        await sendEmail(

            email,

            "RailNova OTP Verification",

            `
            <h2>Your new OTP</h2>
            <h1>${otp}</h1>
            <p>Valid for 5 minutes.</p>
            `
        );

        res.json({

            message: "OTP sent successfully."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                message: "All fields are required"

            });

        }

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({

                message: "User not found."

            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({

                message: "Invalid password."

            });

        }

        const token = jwt.sign(

            {
        
                id: user._id,
        
                role: user.role
        
            },
        
            process.env.JWT_SECRET,
        
            {
        
                expiresIn: "7d"
        
            }
        
        );

        res.status(200).json({

            message: "Login successful.",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role:user.role

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

            return res.status(404).json({

                message: "User not found."

            });

        }

        res.status(200).json(user);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const updateProfile = async (req, res) => {

    try {

        const { name, email } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                message: "User not found."

            });

        }

        user.name = name || user.name;

        user.email = email || user.email;

        await user.save();

        res.json({

            message: "Profile updated successfully.",

            user

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const changePassword = async (req, res) => {

    try {

        const {

            currentPassword,

            newPassword

        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                message: "User not found."

            });

        }

        const match = await bcrypt.compare(

            currentPassword,

            user.password

        );

        if (!match) {

            return res.status(400).json({

                message: "Current password is incorrect."

            });

        }

        user.password = await bcrypt.hash(

            newPassword,

            10

        );

        await user.save();

        res.json({

            message: "Password changed successfully."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const deleteAccount = async (req, res) => {

    try {

        await User.findByIdAndDelete(req.user.id);

        res.json({

            message: "Account deleted successfully."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};
module.exports = {

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

};