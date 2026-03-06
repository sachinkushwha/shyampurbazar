const { Resend } = require("resend");

const sendEmail = async (receiverEmails) => {
  try {

const resend = new Resend(process.env.RESEND_API_KEY);
 const result=await resend.emails.send({
     from: `ShyamPur <${process.env.EMAIL_FROM}>`,// testing ke liye
      to: receiverEmails, // yaha array pass kar sakte ho
      subject: "New Order Received",
      html: `
      <p><b>A new order has been received.</b></p>
      <p>View full order details:
      <a href="${process.env.OWNER_ORDER_PAGE}">
      Open Order Page
      </a>
      </p>
      `
    });


  } catch (e) {
    console.log(e);
  }
};

module.exports = sendEmail;