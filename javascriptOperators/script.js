const firstInput = document.querySelector("#firstValue");
const secondInput = document.querySelector("#secondValue");
const operationSelect = document.querySelector("#operation");
const calculateButton = document.querySelector("#calculateButton");
const resultOutput = document.querySelector("#resultOutput");
const explanation = document.querySelector("#explanation");

function calculate() {
  const first = Number(firstInput.value);
  const second = Number(secondInput.value);
  const operation = operationSelect.value;

  let result;
  let description;

  switch (operation) {
    case "add":
      result = first + second;
      description = `${first} + ${second} = ${result}`;
      break;
    case "subtract":
      result = first - second;
      description = `${first} - ${second} = ${result}`;
      break;
    case "multiply":
      result = first * second;
      description = `${first} * ${second} = ${result}`;
      break;
    case "divide":
      result = second === 0 ? "Cannot divide by zero" : first / second;
      description = second === 0
        ? "Division by zero is not a valid numeric result."
        : `${first} / ${second} = ${result}`;
      break;
    case "remainder":
      result = second === 0 ? "Cannot divide by zero" : first % second;
      description = second === 0
        ? "The remainder is undefined when dividing by zero."
        : `${first} % ${second} = ${result}`;
      break;
    case "power":
      result = first ** second;
      description = `${first} ** ${second} = ${result}`;
      break;
    case "equal":
      // Demonstrates loose equality: values may be converted before comparison.
      result = first == String(second);
      description = `${first} == "${second}" → ${result}`;
      break;
    case "strictEqual":
      // Both input values are numbers, so compare their numeric values and types.
      result = first === second;
      description = `${first} === ${second} → ${result}`;
      break;
    case "greater":
      result = first > second;
      description = `${first} > ${second} → ${result}`;
      break;
    case "and":
      result = Boolean(first) && Boolean(second);
      description = `Boolean(${first}) && Boolean(${second}) → ${result}`;
      break;
    case "or":
      result = Boolean(first) || Boolean(second);
      description = `Boolean(${first}) || Boolean(${second}) → ${result}`;
      break;
    default:
      result = "Unknown operation";
      description = "Choose an operation from the list.";
  }

  resultOutput.textContent = String(result);
  explanation.textContent = description;
}

calculateButton.addEventListener("click", calculate);
firstInput.addEventListener("input", calculate);
secondInput.addEventListener("input", calculate);
operationSelect.addEventListener("change", calculate);

calculate();
