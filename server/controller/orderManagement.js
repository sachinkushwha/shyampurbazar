const { default: mongoose } = require('mongoose');
const Orderdb = require('../model/orderData');
const Userdb = require('../model/user');
const sendEmail = require('../utils/sendEmail');
// create orders
exports.Order = async (req, res) => {
    try {
        // const { user, number, ownerid, item, address, totalPayment, paymentmode } = req.body;
        // const ids = item.map(ids => ids.ownerid);
        // console.log(ids);
        const orderData = req.body;
        console.log(orderData);
        if (orderData) {
            const savedOrders = await Promise.all(
                orderData.map(async (ord) => {
                    const order = new Orderdb({
                        vendorId: ord.vendorId,
                        user: ord.user,
                        number: ord.number,
                        address: ord.address,
                        items: ord.items,
                        totalPayment: ord.totalPayment,
                        paymentmode: ord.paymentmode,
                        userid: req.user.id
                    });
                    const saved = await order.save();
                    const useremail = await Userdb.findById(ord.vendorId).select("email");
                    if (useremail?.email) {
                        console.log('email',useremail);
                        sendEmail([useremail.email]);
                    }
                    return saved;
                })
            )

            return res.status(200).json({ "message": "order submited", "status": true });
        } else {
            res.status(500).json({ "message": "data is missing" });
        }
    } catch (error) {
        res.status(500).json({ "message": "server error", error });
    }


}
//for user
exports.getorder = async (req, res) => {
    try {
        const orderdata = await Orderdb.find({ userid: req.user.id }).sort({ _id: -1 });
        if (orderdata.length !== 0) {
            return res.status(200).json({ orderdata: orderdata });
        } else {
            return res.status(200).json({ message: 'order not found', orderdata: orderdata });
        }
    } catch (err) {
        return res.status(500).json({ message: "internal server error", err });
    }
}

//for owner
exports.ownergetOrder = async (req, res) => {
    try {
        const result =await Orderdb.find({vendorId:req.user.id});
        // const result = await Orderdb.aggregate([
        //     {
        //         $match: {
        //             "item.ownerid": new mongoose.Types.ObjectId(req.user.id)
        //         }
        //     },
        //     {
        //         $addFields: {
        //             item: {
        //                 $filter: {
        //                     input: "$item",
        //                     as: "i",
        //                     cond: {
        //                         $eq: ["$$i.ownerid", new mongoose.Types.ObjectId(req.user.id)]
        //                     }
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $sort: {
        //             _id: -1
        //         }
        //     }
        // ]);
        return res.status(200).json({ message: "data find", result });
    } catch (err) {
        return res.status(500).json({ message: "internal server error ", err });
    }
}

exports.UpdateOrderStatus = async (req, res) => {
    try {
        const { orderId, newStatus } = req.body;
        await Orderdb.findByIdAndUpdate(orderId, { orderstatus: newStatus }, { new: true, runValidators: true });
        return res.status(200).json({ message: "status changed" });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

}