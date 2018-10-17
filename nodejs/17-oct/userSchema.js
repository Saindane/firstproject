const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    description: String,
    size: String,
    price: String,
    order: Number,
    quantity: Number
});

module.exports = mongoose.model("userSchema", userSchema);