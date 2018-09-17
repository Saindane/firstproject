const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: String,
    name: String,
    email: String,
    age: Number
})

module.exports = mongoose.model("userSchema", userSchema);