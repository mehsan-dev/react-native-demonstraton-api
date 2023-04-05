const { validateCalculator } = require("../helpers/validations");
const CalculatorService = require("../services/calculator.service");

exports.calculate = (req, res) => {
  const { error } = validateCalculator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const result = CalculatorService.calculate(req.body);
  return res.json(result);
};
