const mongoose = require('mongoose');
/*
const countrySchema = mongoose.Schema({
    countryCode: {
        type: Number,
        min: 100,
        max: 999
    },
    countryName: String
})

module.exports = mongoose.model("countrySchema", countrySchema);*/

const countrySchema = mongoose.Schema({
    country: {
        countryCode: {
            type: String,
            maxlength: 3,
            minlength: 3
        },
        countryName: String
    }
})

module.exports = mongoose.model("countrySchema", countrySchema);