const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    vendorName: { type: String },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: { type: Number },
            unitPrice: { type: Number },
            gstRate: { type: Number }
        }
    ],
    totalAmount: { type: Number },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Purchase', purchaseSchema);