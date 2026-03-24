const express=require('express');
const publicRouter=express.Router();
const authenticationController=require('../controller/authentication');
const HomepageproductController=require('../controller/homepageproduct');
const { jwtauth } = require('../middleware/jwtMiddleware');
const { IsNormalUser } = require('../middleware/isNormaluser');
const upload =require('../utils/multerCloudinaryStorage')

publicRouter.get('/',HomepageproductController.Homepageproduct);
publicRouter.post('/login',authenticationController.Login);
publicRouter.post('/signup',IsNormalUser,authenticationController.Signup);
publicRouter.post('/bcoomeseller',jwtauth,upload.single('Image'),authenticationController.BecomeSeller);
publicRouter.post('/addaddress',jwtauth,authenticationController.AddAdress);
publicRouter.get('/getaddress',jwtauth,authenticationController.getAddress);
publicRouter.get('/me',jwtauth,(req,res)=>{
    return res.status(200).json({
        id:req.user.id,
        role:req.user.role,
        name:req.user.username
    });
})
module.exports=publicRouter;