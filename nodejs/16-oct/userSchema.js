const mongoose = require('mongoose');

const userLoginSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String
});

module.exports = mongoose.model("userLoginSchema", userLoginSchema);