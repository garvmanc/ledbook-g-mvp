const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    gstin: { type: String },
    outstandingAmount: { type: Number, default: 0 }},
    { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);