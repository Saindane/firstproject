const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    description: String,
    size: String,
    price: String,
    date: String,
    contactNo: [{ mobileNo: Number, alternativeNo: Number }]
});

module.exports = mongoose.model("userSchema", userSchema);