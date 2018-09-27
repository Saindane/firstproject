const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyName: String,
    companyInfo: String,
    status: String
})

module.exports = mongoose.model("companySchema", companySchema);