const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    Mbnumber:{type:Number,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['user','seller'],default:'user',required:true},
    storeName:{type:String,required:true,default:'NA'}
});

module.exports=mongoose.model('user',userSchema);