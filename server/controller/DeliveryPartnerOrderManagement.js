const OrderDB = require('../model/orderData');


exports.AcceptedOrders = async (req, res) => {
    try {
        const acceptedOrder = await OrderDB.find({ acceptedBy: req.deliveryPartner.id }).sort({_id:-1});
        if (acceptedOrder.length === 0) {
            return res.status(404).json({ message: 'no accepted product found' });
        }
        return res.status(200).json({ acceptedOrder });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'server error' });
    }
}