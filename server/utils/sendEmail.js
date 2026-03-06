const nodemailer = require('nodemailer')

const sendEmail = async (receiverEmail) => {

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465, // या 587
            secure: true, // 465 के लिए true, 587 के लिए false
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                // यह IPv6 की समस्या को दरकिनार करने में मदद कर सकता है
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: receiverEmail,
            subject: "New Order Received",
            html: `<p><b>A new order has been received.</b></p>
        <p>View full order details:
         <a href="${process.env.OWNER_ORDER_PAGE}">
           Open Order Page
         </a>
        </p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Error:', error);
            }
            console.log('Email sent:', info.response);
        });
    } catch (e) {
        console.log(e);
    }
}


module.exports = sendEmail;