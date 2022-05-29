const Product = require('./model');
const Company = require('./../Company/model');
const getProductsByCompanyId = (req, res) => {
    const { companyId } = req.params;
    Product.find({ companyId: companyId }, (err, products) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error', error: err });
        } else if (!products) {
            res.status(404).send({ message: 'Products not found' });
        } else {
            res.status(200).send(products);
        }
    });
}

const getAll = (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error', error: err });
        } else if (!products) {
            res.status(404).send({ message: 'Products not found' });
        } else {
            res.status(200).send(products);
        }
    });
}


const getProductById = (req, res) => {
    const { id } = req.params;
    Product.findById(id, (err, product) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error', error: err });
        } else if (!product) {
            res.status(404).send({ message: 'Product not found' });
        } else {
            res.status(200).send(product);
        }
    });
}



const createProduct = (req, res) => {
    const { name, category, amount, amountUnit, companyName, companyId } = req.body;

    var alsoCompanyId = !companyId ? "6293a64341d0ce445da48eb4" : companyId

    var alsoCompanyName = companyName

    console.log("company Id : "+companyId);
    console.log("company Name : "+companyName);
    console.log(req.body);
    if (!companyName && companyId) {

        Company.findById(companyId, (err, company) => {
            if (err) {
                res.status(500).send({ message: 'Internal server error', error: err });
            } else if (!company) {
                res.status(404).send({ message: 'Company not found' });
            } else {
                alsoCompanyName = company.name
                const product = new Product({ name, category, amount, amountUnit, companyName: alsoCompanyName, companyId: companyId });
                console.log("rpudctWName : "+product);
                product.save((err, product) => {
                    if (err) {
                        res.status(500).send({ message: 'Internal server error', error: err });
                    } else {
                        res.status(201).send(product);
                    }
                });
            }
        });
    } else {
        alsoCompanyName = "ALL"
        const product = new Product({ name, category, amount, amountUnit, companyName: alsoCompanyName, companyId: alsoCompanyId });
        console.log("prduct : "+product);
        product.save((err, product) => {
            if (err) {
                res.status(500).send({ message: 'Internal server error', error: err });
            } else {
                res.status(201).send(product);
            }
        });
    }

  
}

const editProduct = (req, res) => {
    const { id } = req.params;
    const { name, category, amount, amountUnit, companyName, companyId } = req.body;
    Product.findByIdAndUpdate(id, { name, category, amount, amountUnit, companyName, companyId, dateAt: Date.now() }, (err, product) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error', error: err });
        } else if (!product) {
            res.status(404).send({ message: 'Product not found' });
        } else {
            res.status(200).send({ message: 'Product updated successfully', payload: product });
        }
    });
}

const deleteProduct = (req, res) => {
    const { id } = req.params;
    Product.findByIdAndDelete(id, (err, product) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error', error: err });
        } else if (!product) {
            res.status(404).send({ message: 'Product not found' });
        } else {
            res.status(200).send({ message: 'Product deleted successfully', payload: product });
        }
    });
}

module.exports = {
    getProductsByCompanyId,
    getAll,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct
}