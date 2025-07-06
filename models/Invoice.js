const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: { type: String, required: true, unique: true },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true 
        },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, required: true },
                unitPrice: { type: Number, required: true },
                gstRate: { type: Number, required: true },
                total: { type: Number }
            }
        ],
        totalAmt: { type: Number, required: true },
        tax: {
            cgst: { type: Number },
            sgst: { type: Number },
            igst: { type: Number },
        },
        hsn: { type: String },
        status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
        date: { type: Date, default: Date.now }
    },
    { timeStamps: true }
);

module.exports = mongoose.model ('Invoice', invoiceSchema);