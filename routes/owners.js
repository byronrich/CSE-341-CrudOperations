const express = require('express');
const router = express.Router();

const ownersController = require('../controllers/owners');
const validateOwner = require('../validation/owners');
const ensureAuth = require('../auth/ensureAuth');   

router.get('/', ownersController.getAll);
router.get('/:id', ownersController.getOne);

router.post('/', ensureAuth, validateOwner, ownersController.create);   
router.put('/:id', ensureAuth, validateOwner, ownersController.update); 
router.delete('/:id', ensureAuth, ownersController.delete);             

module.exports = router;
