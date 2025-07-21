const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    ref: {
        type: mongoose.Schema.Types.ObjectId,
    },
     refType: {
    type: String, // 'Invoice', 'Purchase', etc.
  },
})