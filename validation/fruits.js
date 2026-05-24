const Joi = require('joi');

const fruitSchema = Joi.object({
  name: Joi.string().min(2).required(),
  color: Joi.string().min(3).required(),
  sweetness: Joi.number().min(1).max(10).required(),
  seeds: Joi.boolean().optional()
});

function validateFruit(req, res, next) {
  const { error } = fruitSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validateFruit;
