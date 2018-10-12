const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    description: String,
    size: String,
    price: String,
    date: String
});

module.exports = mongoose.model("userSchema", userSchema);