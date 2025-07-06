const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        businessName: { type: String, required: true },
        gstin: { type: String },
        logoUrl: { type: String },
        currency: { type: String, default: 'INR '}
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);