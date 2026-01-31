const express=require('express');
const { jwtauth } = require('../middleware/jwtMiddleware');
const MenuItemController=require('../controller/menu Item');
const homepageproductController=require('../controller/homepageproduct');
const OwnerRouter=express.Router();

OwnerRouter.post('/addmenuitem',jwtauth,MenuItemController.AddMenuItem);
OwnerRouter.get('/menuitem',MenuItemController.MenuItem);
OwnerRouter.put('/update/:id',jwtauth,MenuItemController.UpdateItem);
OwnerRouter.delete('/delete/:id',jwtauth,MenuItemController.DeleteItem);
OwnerRouter.put('/homepageproduct/update/:id',jwtauth,homepageproductController.UpdateHomePageProduct);
OwnerRouter.delete('/home/delete/:id',jwtauth,homepageproductController.HomePageProductDelete);
module.exports=OwnerRouter;