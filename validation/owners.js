const Joi = require('joi');

const ownerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  phone: Joi.string().min(7).required(),
  email: Joi.string().email().required()
});

function validateOwner(req, res, next) {
  const { error } = ownerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validateOwner;
