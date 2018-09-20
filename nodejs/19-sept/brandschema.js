const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const brandSchema = mongoose.Schema({
    brandname: String,
    countryCode: { type: Schema.Types.ObjectId, ref: 'schema' }
})

module.exports = mongoose.model("brandSchema", brandSchema);