const express=require('express');
const publicRouter=express.Router();
const authenticationController=require('../controller/authentication');
const HomepageproductController=require('../controller/homepageproduct');
publicRouter.get('/',HomepageproductController.Homepageproduct);
publicRouter.post('/login',authenticationController.Login);
publicRouter.post('/signup',authenticationController.Signup);
// publicRouter.get('/:name',HomepageproductController.TrendingProducts)
module.exports=publicRouter;