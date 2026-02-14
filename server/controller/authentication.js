const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');


exports.Login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "user not found", status: false });
    }
    
    const ispassword = await bcrypt.compare(password, user.password);
    if (ispassword) {
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.jwt_SECRET

        );
        res.status(200).json({
            message: "login successful",
            status: true,
            userid: user._id,
            username: user.name,
            token,
            role: user.role
        });
    } else {
        res.status(401).json({
            message: "check your email or password",
            status: false,
        })
    }

}

exports.Signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({ message: "user already exists", status: false });
    }
    const incryptpassword = await bcrypt.hash(password, 10);
    const newuser = new User({ name, email, password: incryptpassword, role });
    await newuser.save();
    res.status(200).json({ message: "registration successfull", status: true });
}
 
exports.BecomeSeller=async(req,res)=>{
    const {name,role}=req.body;
    const isuser=await User.exists(new mongoose.Types.ObjectId(req.user.id));
    console.log(isuser);
    if(name && role==='seller',isuser){
         const user=await User.findOneAndUpdate(new mongoose.Types.ObjectId( req.user.id),{'role':role,'storeName':name},{new:true,runValidators:true});
        return res.status(200).json({message:"congratulation your are now a seller ",'userrole':user.role});
    }
    return res.status(500).json({message:"kuch to garbad hai bhai"});
}