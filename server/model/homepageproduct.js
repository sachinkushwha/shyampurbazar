const mongoose=require('mongoose');

const homepageproductSchema =new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    imagelink:{type:String,required:true},
    dis:{type:String}
});

module.exports=mongoose.model('homepageproduct',homepageproductSchema);