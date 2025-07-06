const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String },
    unitPrice: { type: Number, required: true },
    gstRate: { type: Number, required: true },
    openingStock: { type: Number, default: 0 },
    currentStock: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 5 }
}, { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);