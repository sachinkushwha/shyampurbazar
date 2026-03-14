const express =require('express');
const SellerProfileController=require('../controller/SellerProfileManagement');
const { jwtauth } = require('../middleware/jwtMiddleware');
const SellerProfileRouter=express.Router();

SellerProfileRouter.get('/profile',jwtauth,SellerProfileController.Profile);

module.exports=SellerProfileRouter;