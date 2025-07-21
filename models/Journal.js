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
            credit: { type: Number, default: 0 }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('journal', JournalSchema);