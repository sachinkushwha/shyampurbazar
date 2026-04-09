const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    village: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    landmark: { type: String },
    pin: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

const storeSchema = new mongoose.Schema({
    storeName: { type: String, required: true, default: 'NA' },
    storeImage: { type: String },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    Mbnumber: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'seller'], default: 'user', required: true },
    storeName: { type: String, required: true, default: 'NA' },
    storeImage: { type: String },
    store: {
        type: [storeSchema],
        default: []
    },
    address: { type: [addressSchema], default: [] }
});
userSchema.index({"store.location":"2dsphere"});
userSchema.index({"address.location":"2dsphere"});
module.exports = mongoose.model('user', userSchema);