const express=require('express');
const publicRouter=express.Router();
const authenticationController=require('../controller/authentication');
const HomepageproductController=require('../controller/homepageproduct');
const { jwtauth } = require('../middleware/jwtMiddleware');
const { IsNormalUser } = require('../middleware/isNormaluser');
publicRouter.get('/',HomepageproductController.Homepageproduct);
publicRouter.post('/login',authenticationController.Login);
publicRouter.post('/signup',IsNormalUser,authenticationController.Signup);
publicRouter.post('/bcoomeseller',jwtauth,authenticationController.BecomeSeller);
// publicRouter.get('/:name',HomepageproductController.TrendingProducts)
module.exports=publicRouter;