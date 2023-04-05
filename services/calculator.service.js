exports.calculate = (data) => {
  const { number1, number2, operation } = data;
  switch (operation) {
    case "Addition":
      return Number(number1) + Number(number2);
    case "Subtraction":
      return number1 - number2;
    case "Multiplication":
      return number1 * number2;

    default:
      throw new Error("Invalid operation");
      break;
  }
};
