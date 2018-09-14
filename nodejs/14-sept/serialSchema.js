const mongoose = require('mongoose');


const serialSchema = mongoose.Schema({
    id: String
})

module.exports = mongoose.model("serialSchema", serialSchema);