const express = require('express');
const router = express.Router();

const veggiesController = require('../controllers/veggies');
const validateVeggie = require('../validation/veggies');

router.get('/', veggiesController.getAll);
router.get('/:id', veggiesController.getOne);
router.post('/', validateVeggie, veggiesController.create);
router.put('/:id', validateVeggie, veggiesController.update);
router.delete('/:id', veggiesController.delete);

module.exports = router;
