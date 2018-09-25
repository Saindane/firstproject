const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    bloodGroup: String
});

module.exports = mongoose.model("studentSchema", studentSchema);