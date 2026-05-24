const Joi = require('joi');

const veggieSchema = Joi.object({
  name: Joi.string().min(2).required(),
  color: Joi.string().min(3).required(),
  isRoot: Joi.boolean().required(),
  calories: Joi.number().optional()
});

function validateVeggie(req, res, next) {
  const { error } = veggieSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validateVeggie;
