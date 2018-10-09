const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyName: String,
    companyInfo: {
        fax: Number,
        registrationNo: Number,
        userInfo: {
            userEmail: [{ type: String }]
        },
        status: {
            type: String,
            enum: ['activated', 'deactivated', 'deleted']
        }
    },


})

module.exports = mongoose.model("companySchema", companySchema);