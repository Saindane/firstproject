const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const empSchema = mongoose.Schema({
    empName: String,
    empAddress: String,
    country: String,
    state: String,
    department: String,
    status: String
})
empSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("empSchema", empSchema);