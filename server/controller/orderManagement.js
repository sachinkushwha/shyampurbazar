const Orderdb=require('../model/orderData');
exports.Order=async(req,res)=>{
    const {user,ownerid,item,address,totalPayment,paymentmode} =req.body;
    const  orderData=req.body;
    console.log(orderData);
    if(orderData){
        const order=new Orderdb({username:user,item,address,totalPayment,paymentmode,ownerid,userid:req.user.id});
        await order.save();
        return res.status(200).json({"message":"order submited","status":true});
    }
    res.status(500).json({"message":"server error"});
}

exports.getorder=async(req,res)=>{
    try{
        const orderdata=await Orderdb.find({userid:req.user.id}).sort({_id:-1});
        if(orderdata.length!==0){
            return res.status(200).json({orderdata:orderdata});
        }
    }catch(err){
        return res.status(500).json({message:"internal server error",err});
    }
}