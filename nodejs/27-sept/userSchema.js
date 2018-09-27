const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, index: true, unique: true },
    userInfo: {
        userName: String,
        address: String
    },
    status: {
        type: String,
        enum: ['activated', 'deactivated', 'deleted']

    },
    password: String

});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("userSchema", userSchema);