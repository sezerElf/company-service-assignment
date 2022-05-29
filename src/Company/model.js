const mongoose = require('mongoose');


const CompanySchema = new mongoose.Schema({
    name: String,
    legalNumber: String,
    country: String,
    webSite: String,
    dateAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Company', CompanySchema);