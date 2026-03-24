require('dotenv').config();
const express = require('express');
const app = express();
const publicRouter = require('./routers/publicRouter');
const protectedRoute=require('./routers/adminProtectedRoute');
const orderManagementRoute=require('./routers/orderManagement');
const OwnerRouter=require('./routers/ownerRouter');
const SellerProfileRouter=require('./routers/SellerProfileRouter');
const DeliveryRouter=require('./routers/deliveryRouter');
const cors = require('cors');
const cookieParser =require('cookie-parser');


const mongoose = require('mongoose');
app.use(cors({
    origin:['http://localhost:5173','http://localhost:5174'],
    credentials:true
})); 
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use(publicRouter)
app.use(protectedRoute);
app.use('/item',OwnerRouter);
app.use('/protected',orderManagementRoute);
app.use('/sellerprofile',SellerProfileRouter);
// for delivery partner
app.use('/deliverypartner',DeliveryRouter);
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(3001, () => {
        console.log('server runing on http://localhost:3001');
    })
}).catch(err=>{
    console.log("mongodb connection error" ,err);
})
