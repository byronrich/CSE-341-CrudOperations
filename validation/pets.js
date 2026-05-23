const Joi = require('joi');

const petSchema = Joi.object({
  name: Joi.string().min(2).required(),
  type: Joi.string().min(2).required(),
  age: Joi.number().min(0).required(),
  ownerId: Joi.string().required()
});

function validatePet(req, res, next) {
  const { error } = petSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validatePet;
