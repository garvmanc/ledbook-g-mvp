const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    ref: {
        type: mongoose.Schema.Types.ObjectId,
    },
    refType: {
    type: String,
    },
    memo: {
    type: String,
    required: true
    },
    entries: [
        {
            account: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'account',
                required: true
            },
            debit: { type: Number, default: 0 },
        }
    ]
})