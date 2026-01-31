const mongoose=require('mongoose');

const MenuItemSchema=new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    Quantity:{type:String,require:true},
    ImageLink:{type:String,require:true},
    ownerId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    dis:{type:String}
});

module.exports=mongoose.model('menuitem',MenuItemSchema);