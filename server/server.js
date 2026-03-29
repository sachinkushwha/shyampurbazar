require("dotenv").config();
const express = require("express");
const app = express();
const publicRouter = require("./routers/publicRouter");
const protectedRoute = require("./routers/adminProtectedRoute");
const orderManagementRoute = require("./routers/orderManagement");
const OwnerRouter = require("./routers/ownerRouter");
const SellerProfileRouter = require("./routers/SellerProfileRouter");
const DeliveryRouter = require("./routers/deliveryRouter");
const UserDB = require("./model/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
app.use(
  cors({
    origin: [
      `${process.env.MAIN_FRONTEND_URL}`,
      `${process.env.DELIVERY_PARTNER_FRONTEND_URL}`,
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use(publicRouter);
app.use(protectedRoute);
app.use("/item", OwnerRouter);
app.use("/protected", orderManagementRoute);
app.use("/sellerprofile", SellerProfileRouter);
// for delivery partner
app.use("/deliverypartner", DeliveryRouter);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(3001, async () => {
      console.log("server runing on http://localhost:3001");
      await UserDB.init();
    });
  })
  .catch((err) => {
    console.log("mongodb connection error", err);
  });
