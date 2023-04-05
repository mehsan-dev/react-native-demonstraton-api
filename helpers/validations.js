const Joi = require("joi");
const mongoose = require("mongoose");

const validateObjectId = (ID) => {
  return mongoose.Types.ObjectId.isValid(ID);
};

const validateUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(25).required(),
});

const validateCalculator = Joi.object({
  number1: Joi.number().required("Number1 must be valid number"),
  number2: Joi.number().required("Number2 must be valid number"),
  operation: Joi.string().required(),
});

module.exports = {
  validateObjectId,
  validateUser,
  validateCalculator,
};
