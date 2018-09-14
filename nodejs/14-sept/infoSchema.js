const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const infoSchema = mongoose.Schema({
    name: String,
    email: String,
    id: { type: Schema.Types.ObjectId, ref: 'serialSchema' }
})

module.exports = mongoose.model("infoSchema", infoSchema);