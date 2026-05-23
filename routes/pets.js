const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');
const validatePet = require('../validation/pets');

router.get('/', petsController.getAll);
router.get('/:id', petsController.getOne);
router.post('/', validatePet, petsController.create);
router.put('/:id', validatePet, petsController.update);
router.delete('/:id', petsController.delete);

module.exports = router;
