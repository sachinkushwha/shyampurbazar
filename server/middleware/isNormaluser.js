exports.IsNormalUser=(req,res,next)=>{
    const {role}=req.body;
    console.log(role)
    if(role!=='user'){
        return res.status(403).json({
            message:"access denied, signup as a normal user first"
        })
    }else{
        next();
    }
}