const controller = require('./controller');
const router = require("express").Router();

router.get('/:id', controller.getProductById);
router.get('/', controller.getAll);
router.get('/list/:companyId', controller.getProductsByCompanyId);
router.post('/', controller.createProduct);
router.put('/:id', controller.editProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;

