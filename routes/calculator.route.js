const router = require("express").Router();

const CalculatorController = require("../controllers/calculator.controller");

router.post("/calculate", CalculatorController.calculate);

module.exports = router;
