// emailSender.js
const nodemailer = require("nodemailer");

// Gmail / SMTP transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail", // ya koi SMTP server jaise smtp.mailtrap.io
  auth: {
    user: process.env.EMAIL_FROM, // example: yourgmail@gmail.com
    pass: process.env.EMAIL_PASS, // Gmail app password ya SMTP password
  },tls: {
    rejectUnauthorized: false, // <--- add this
  },
});

/**
 * sendEmail function
 * @param {string[]} receiverEmails - array of recipient emails
 */
const sendEmail = async (receiverEmails) => {
  try {
    const mailOptions = {
      from: `"ShyamPur" <${process.env.EMAIL_FROM}>`,
      to: receiverEmails.join(", "), // multiple recipients comma-separated
      subject: "New Order Received",
      html: `
        <p><b>A new order has been received.</b></p>
        <p>View full order details:
        <a href="${process.env.OWNER_ORDER_PAGE}">Open Order Page</a>
        </p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Emails sent: ", info.response);
  } catch (err) {
    console.error("Error sending email: ", err);
  }
};

module.exports = sendEmail;