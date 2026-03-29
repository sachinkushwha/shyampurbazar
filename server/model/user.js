const mongoose=require('mongoose');

const address=new mongoose.Schema({
    village:{type:String,required:true},
    street:{type:String,required:true},
    city:{type:String,required:true},
    landmark:{type:String},
    pin:{type:String,required:true},
})

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique: true},
    Mbnumber:{type:Number,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['user','seller','deliverypartner'],default:'user',required:true},
    storeName:{type:String,required:true,default:'NA'},
    storeImage:{type:String},
    address:{type:[address],default:[]}
});

module.exports=mongoose.model('user',userSchema);