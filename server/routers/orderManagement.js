const express=require('express');
const orderManagementRouter=express.Router();
const userProtectedController=require('../controller/orderManagement');
const {jwtauth}=require('../middleware/jwtMiddleware');
const { jwtDeliveryP } = require('../middleware/jwtForDeliveryPartner');

orderManagementRouter.post('/order',jwtauth,userProtectedController.Order);
orderManagementRouter.post('/updatestatus',jwtauth,userProtectedController.UpdateOrderStatus);
orderManagementRouter.get('/order',jwtauth,userProtectedController.getorder);
orderManagementRouter.get('/ownergetOrder',jwtauth,userProtectedController.ownergetOrder);

//for deliveryPartner

orderManagementRouter.get('/deliverypartnerorder',jwtDeliveryP,userProtectedController.getDeliveryPrtnerOrder);

module.exports=orderManagementRouter;