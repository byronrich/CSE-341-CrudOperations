const express = require('express');
const router = express.Router();

const veggiesController = require('../controllers/veggies');
const validateVeggie = require('../validation/veggies');
const ensureAuth = require('../auth/ensureAuth');   

router.get('/', veggiesController.getAll);
router.get('/:id', veggiesController.getOne);

router.post('/', ensureAuth, validateVeggie, veggiesController.create);   
router.put('/:id', ensureAuth, validateVeggie, veggiesController.update); 
router.delete('/:id', ensureAuth, veggiesController.delete);              

module.exports = router;
