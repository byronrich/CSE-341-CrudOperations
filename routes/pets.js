const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');
const validatePet = require('../validation/pets');
const ensureAuth = require('../auth/ensureAuth');   

router.get('/', petsController.getAll);
router.get('/:id', petsController.getOne);

router.post('/', ensureAuth, validatePet, petsController.create);   
router.put('/:id', ensureAuth, validatePet, petsController.update); 
router.delete('/:id', ensureAuth, petsController.delete);           

module.exports = router;
