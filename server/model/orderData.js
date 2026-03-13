const mongoose = require('mongoose');

const getFormatDate = () => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;

}
const OrderSchema = new mongoose.Schema({
    vendorId: { type: String, required: true },
    user: { type: String, required: true },
    number: { type: Number, required: true },
    address: { type: String, required: true },
    items: [{
        productId:String,
        name: String,
        qty: Number,
        price: Number
    }],
    totalPayment: { type: Number, required: true },
    paymentmode: { type: String, required: true },
    orderstatus: { type: String, required: true, default: "pending" },
    orderdate: { type: String, default: getFormatDate },

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
});

module.exports = mongoose.model('orders', OrderSchema);