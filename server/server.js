const express = require('express');
const app = express();
const publicRouter = require('./routers/publicRouter');
const protectedRoute=require('./routers/adminProtectedRoute');
const orderManagementRoute=require('./routers/orderManagement');
const OwnerRouter=require('./routers/ownerRouter');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(publicRouter)
app.use(protectedRoute);
app.use('/item',OwnerRouter);
app.use('/protected',orderManagementRoute);
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(3001, () => {
        console.log('server runing on http://localhost:3001');
    })
}).catch(err=>{
    console.log("mongodb connection error" ,err);
})
