const express =require('express');
const DeliveryRouter=express.Router();
const authenticationController=require('../controller/authentication');
const { jwtDeliveryP } = require('../middleware/jwtForDeliveryPartner');

DeliveryRouter.post('/signup',authenticationController.SignupDeliveryPartner);
DeliveryRouter.post('/login',authenticationController.LoginDeliveryPartner);
DeliveryRouter.post('/logout',jwtDeliveryP,authenticationController.DeliveryPartnerLogout);
DeliveryRouter.get('/me',jwtDeliveryP,(req,res)=>{
    return res.status(200).json({
        id:req.deliveryPartner.id,
        role:req.deliveryPartner.role,
        name:req.deliveryPartner.username
    });
})
module.exports=DeliveryRouter;