const express = require('express');
const router = express.Router();

const fruitsController = require('../controllers/fruits');
const validateFruit = require('../validation/fruits');
const ensureAuth = require('../auth/ensureAuth');   

router.get('/', fruitsController.getAll);
router.get('/:id', fruitsController.getOne);

router.post('/', ensureAuth, validateFruit, fruitsController.create);   
router.put('/:id', ensureAuth, validateFruit, fruitsController.update); 
router.delete('/:id', ensureAuth, fruitsController.delete);             

module.exports = router;
