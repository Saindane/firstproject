const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyName: String,
    address: String,
    country: String,
    state: String,
    city: String,
    status: String,
})

module.exports = mongoose.model("companySchema", companySchema);