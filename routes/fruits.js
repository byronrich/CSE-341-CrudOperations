const express = require('express');
const router = express.Router();

const fruitsController = require('../controllers/fruits');
const validateFruit = require('../validation/fruits');

router.get('/', fruitsController.getAll);
router.get('/:id', fruitsController.getOne);
router.post('/', validateFruit, fruitsController.create);
router.put('/:id', validateFruit, fruitsController.update);
router.delete('/:id', fruitsController.delete);

module.exports = router;
