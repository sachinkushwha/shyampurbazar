const Userdb=require('../model/user');
const mongoose=require('mongoose');
exports.Profile=async(req,res)=>{
    try{
        const userid=new mongoose.Types.ObjectId(req.user.id);
        const profileData=await Userdb.find(userid);
        return res.status(200).json({message:'user Profile',profileData});
    }catch(e){
        console.error(e);
    }
}