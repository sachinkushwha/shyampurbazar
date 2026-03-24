const mongoose = require('mongoose');

const DeliveryPartnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    Mbnumber: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['deliverypartner'], default: 'deliverypartner', required: true },
},{timestamps:true});

module.exports=mongoose.model('deliverypartneraccount',DeliveryPartnerSchema);