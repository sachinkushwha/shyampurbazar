const express=require('express');
const paymentRouter=express.Router();
const paymentController=require('../controller/paymentController')

paymentRouter.post('/create-order',paymentController.CreateOrder);
paymentRouter.post('/verify-payment',paymentController.VerifyPayment);

module.exports=paymentRouter;