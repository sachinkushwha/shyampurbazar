const express=require('express');
const orderManagementRouter=express.Router();
const userProtectedController=require('../controller/orderManagement');
const {jwtauth}=require('../middleware/jwtMiddleware');

orderManagementRouter.post('/order',jwtauth,userProtectedController.Order);
orderManagementRouter.get('/order',jwtauth,userProtectedController.getorder);

module.exports=orderManagementRouter;