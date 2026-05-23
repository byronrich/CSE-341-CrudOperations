const express = require('express');
const router = express.Router();

const ownersController = require('../controllers/owners');
const validateOwner = require('../validation/owners');

router.get('/', ownersController.getAll);
router.get('/:id', ownersController.getOne);
router.post('/', validateOwner, ownersController.create);
router.put('/:id', validateOwner, ownersController.update);
router.delete('/:id', ownersController.delete);

module.exports = router;
