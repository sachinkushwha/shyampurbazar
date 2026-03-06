const nodemailer = require('nodemailer')

const sendEmail = async (receiverEmail) => {

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // 587 के लिए false ही रखें
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            connectionTimeout: 10000, // 10 सेकंड का समय दें
            greetingTimeout: 10000,
            socketTimeout: 10000
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'sachinkushawaha349@gmail.com',
            subject: "New Order Received",
            html: `<p><b>A new order has been received.</b></p>
        <p>View full order details:
         <a href="${process.env.OWNER_ORDER_PAGE}">
           Open Order Page
         </a>
        </p>`
        };

        await transporter.sendMail(mailOptions);
    } catch (e) {
        console.log(e);
    }
}


module.exports = sendEmail;