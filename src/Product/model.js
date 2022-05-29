const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    amount: Number,
    amountUnit: String,
    companyName: String,
    companyId: String,
    dateAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Product', ProductSchema);