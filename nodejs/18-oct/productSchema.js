const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: String,
    price: Number,
    gst: Number,
    brand: [String],
    country: String
});

module.exports = mongoose.model("productSchema", productSchema);