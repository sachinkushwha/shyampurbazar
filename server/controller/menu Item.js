const { default: mongoose } = require('mongoose');
const MenuItemdb = require('../model/menuItem');
const user = require('../model/user');
// for all user frontend ke liye
exports.MenuItem = async (req, res) => {
    try {
        const result = await MenuItemdb.find().sort({ _id: -1 });
        return res.status(200).json({ itemdata: result });
    } catch (err) {
        return res.status(200).json({ message: "internal server error" });
    }

}
// for owner 
exports.Ownermenuitem = async (req, res) => {
    try {
        const result = await MenuItemdb.find({ownerId:req.user.id}).sort({ _id: -1 });
        return res.status(200).json({ itemdata: result });
    } catch (err) {
        return res.status(200).json({ message: "internal server error" });
    }

}

// owner item add karega
exports.AddMenuItem = async (req, res) => {
    try {
        const ownerId=req.user.id;
        const {name,price,Quantity,ImageLink,dis}=req.body;
        const result = new MenuItemdb({name,price,Quantity,ImageLink,ownerId,dis});
        await result.save();
        // await user.findByIdAndUpdate(req.user.id, { $push: { menuitem: result._id } });
        return res.status(200).json({ message: "data save successfuly" ,newitem:result});
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }

}
// owner product ko update karega
exports.UpdateItem = async (req, res) => {
    try {
        const result = await MenuItemdb.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({message:"data update successfuly",updatedData:result});
    }catch(err){
        return res.status(500).json({message:"internal server error"});
    }
    
}
// owner product delete hoga
exports.DeleteItem=async(req,res)=>{
    try{
        const result=await MenuItemdb.findByIdAndDelete(req.params.id);
        return res.status(200).json({status:true});
    }catch(err){
        return res.status(500).json({status:false});
    }
}

// owner ko product mai se ek product nikal kar jayega update ke liye
exports.OneMenuItem=async(req,res)=>{
    try{
        const id=req.params.id;
        const OneProduct =await MenuItemdb.findOne(new mongoose.Types.ObjectId(id));
        if(!OneProduct){
            return res.status(404).json({message:'Product not find'});
        }
        return res.status(200).json({message:'data fatched',OneProduct});
    }catch(err){
        console.log('OneMenuItem handler mai error aaya hai');
        return res.status(500).json({message:'internal server error'});
    }
}