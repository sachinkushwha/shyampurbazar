const express=require('express');
const {jwtauth}=require('../middleware/jwtMiddleware');
const protectedRoute=express.Router();
const homepageproductController=require('../controller/homepageproduct');

protectedRoute.post('/addhomepageproduct',jwtauth,homepageproductController.AddProductToHomePage);
protectedRoute.get('/OneHomepagedata/:id',jwtauth,homepageproductController.getOneProduct);

module.exports=protectedRoute;