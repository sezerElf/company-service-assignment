const controller = require('./controller');
const router = require("express").Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.edit);
router.delete('/:id', controller.deleteById);
router.get('/general/dashboard', controller.getDashboard);

module.exports = router;