const Company = require('./model');
const Product = require('./../Product/model');

// company crud operations
const create = (req, res) => {
    const { name, legalNumber, country, webSite } = req.body;
    const company = new Company({ name, legalNumber, country, webSite });
    company.save((err, company) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error', error: err });
        } else {
            res.status(201).send(company);
        }
    });
}

const getAll = (req, res) => {
    Company.find({}, (err, companies) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error', error: err });
        } else {
            res.status(200).send(companies);
        }
    });
}

const getById = (req, res) => {
    const { id } = req.params;
    Company.findById(id, (err, company) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error', error: err });
        } else if (!company) {
            res.status(404).send({ message: 'Company not found' });
        } else {
            res.status(200).send(company);
        }
    });
}
const edit = (req, res) => {
    const { id } = req.params;
    const { name, legalNumber, country, webSite } = req.body;
    Company.findByIdAndUpdate(id, { name, legalNumber, country, webSite, dateAt: Date.now() }, (err, company) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error', error: err });
        } else if (!company) {
            res.status(404).send({ message: 'Company not found' });
        } else {
            res.status(200).send({ message: 'Company updated successfully', payload: company });
        }
    });
}
const deleteById = (req, res) => {
    const { id } = req.params;
    Company.findByIdAndDelete(id, (err, company) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error', error: err });
        } else if (!company) {
            res.status(404).send({ message: 'Company not found' });
        } else {
            res.status(200).send({ message: 'Company deleted successfully', payload: company });
        }
    });
}

// get company count,product count, last added 3 companies, last added 3 products
// compaines is sort by dateAt get last added 3
// products is sort by dateAt get last added 3
// just 3 companies and 3 products
const getDashboard = (req, res) => {
    Company.countDocuments({}, (err, companyCount) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error', error: err });
        } else {
            Product.countDocuments({}, (err, productCount) => {
                if (err) {
                    res.status(500).send({ message: 'Internal server error', error: err });
                } else {
                    Company.find({}, {}, { sort: { dateAt: -1 }, limit: 3 }, (err, companies) => {
                        if (err) {
                            res.status(500).send({ message: 'Internal server error', error: err });
                        } else {
                            Product.find({}, {}, { sort: { dateAt: -1 }, limit: 3 }, (err, products) => {
                                if (err) {
                                    res.status(500).send({ message: 'Internal server error', error: err });
                                } else {
                                    res.status(200).send({ companyCount, productCount, companies, products });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}



module.exports = {
    create,
    getAll,
    getById,
    edit,
    deleteById,
    getDashboard
}
