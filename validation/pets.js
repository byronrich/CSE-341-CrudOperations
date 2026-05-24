const Joi = require('joi');

const petSchema = Joi.object({
  name: Joi.string().min(2).required(),
  species: Joi.string().min(2).required(),   // FIXED (was "type")
  age: Joi.number().min(0).required(),
  ownerId: Joi.string().optional()           // optional to prevent 400 errors
});

function validatePet(req, res, next) {
  const { error } = petSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validatePet;
