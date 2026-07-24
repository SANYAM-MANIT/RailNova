require("dotenv").config();
const nodemailer = require("nodemailer");
const axios = require("axios");

/**
 * Send email using Brevo HTTP API (recommended for cloud hosts like Render/Vercel)
 * or Nodemailer Gmail SMTP as fallback.
 */
const sendEmail = async (to, subject, html) => {
    // 1. Try Brevo HTTP API if BREVO_API_KEY is available
    if (process.env.BREVO_API_KEY) {
        try {
            const senderEmail = process.env.EMAIL_USER || "monudon10022006@gmail.com";
            const response = await axios.post(
                "https://api.brevo.com/v3/smtp/email",
                {
                    sender: { name: "RailNova", email: senderEmail },
                    to: [{ email: to }],
                    subject: subject,
                    htmlContent: html
                },
                {
                    headers: {
                        "api-key": process.env.BREVO_API_KEY.trim(),
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log("✅ Email sent successfully via Brevo API to:", to);
            return response.data;
        } catch (error) {
            console.error("❌ Brevo API Email Error:", error.response?.data || error.message);
            // Fall through to Nodemailer if Brevo fails
        }
    }

    // 2. Fallback to Nodemailer SMTP (Gmail or custom SMTP)
    const emailUser = process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : "";
    const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, "") : "";

    if (!emailUser || !emailPass) {
        const errMsg = "❌ Email credentials missing! Please set EMAIL_USER and EMAIL_PASS (or BREVO_API_KEY) in environment variables.";
        console.error(errMsg);
        throw new Error(errMsg);
    }

    // Create transporter with explicit Gmail SMTP configuration
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // SSL
        auth: {
            user: emailUser,
            pass: emailPass
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        const info = await transporter.sendMail({
            from: `"RailNova" <${emailUser}>`,
            to,
            subject,
            html
        });
        console.log("✅ Email sent successfully via Nodemailer to:", to, "MessageId:", info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Nodemailer SMTP Email Error:", error.message);
        throw error;
    }
};

module.exports = sendEmail;