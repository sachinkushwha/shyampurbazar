const nodemailer = require('nodemailer')

const sendEmail = async (receiverEmail) => {

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },

        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: receiverEmail,
            subject: "New Order Received",
            text: `A new order has been received.
               View full order details here:
               ${process.env.OWNER_ORDER_PAGE}`,

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