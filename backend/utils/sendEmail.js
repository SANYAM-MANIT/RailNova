// require("dotenv").config();

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({

//     host: "smtp.gmail.com",

//     port: 587,

//     secure: false,

//     auth: {

//         user: process.env.EMAIL_USER,

//         pass: process.env.EMAIL_PASS

//     }

// });

// const sendEmail = async (to, subject, html) => {

//     await transporter.sendMail({

//         from: `"RailNova" <${process.env.EMAIL_USER}>`,

//         to,

//         subject,

//         html

//     });

// };

// module.exports = sendEmail;


// require("dotenv").config();

// const brevo = require("@getbrevo/brevo");

// const apiInstance = new brevo.TransactionalEmailsApi();

// apiInstance.setApiKey(
//     brevo.TransactionalEmailsApiApiKeys.apiKey,
//     process.env.BREVO_API_KEY
// );

// const sendEmail = async (to, subject, html) => {

//     const email = new brevo.SendSmtpEmail();

//     email.sender = {
//         name: "RailNova",
//         email: "monudon10022006@gmail.com"
//     };

//     email.to = [
//         {
//             email: to
//         }
//     ];

//     email.subject = subject;

//     email.htmlContent = html;

//     await apiInstance.sendTransacEmail(email);

// };

// module.exports = sendEmail;

require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (to, subject, html) => {

    await transporter.sendMail({
        from: `"RailNova" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    });

    console.log("✅ Email Sent Successfully");

};

module.exports = sendEmail;