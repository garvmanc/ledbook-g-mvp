const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
})