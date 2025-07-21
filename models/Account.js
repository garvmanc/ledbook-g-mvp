const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'],
        required: true
    },
    description: String
});

module.exports = mongoose.model('account', AccountSchema);
