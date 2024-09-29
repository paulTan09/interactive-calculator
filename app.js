// calc. function
function operate(operator, num1, num2) {
  operator = operator.trim(); // removes extra spaces
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 !== 0 ? num1 / num2 : "Error: Division by zero";
    default:
      return "Error: Invalid operator";
  }
}

let currentInput = '';
let previousInput = '';
let currentOperator = null;
let shouldResetScreen = false;

const screen = document.querySelector(".screen");
const buttonNumbers = document.querySelectorAll(".number");
const buttonOperators = document.querySelectorAll(".operator");
const buttonClear = document.querySelector(".clear");
const buttonEqual = document.querySelector("#btnEqual");
const decimalButton = document.querySelector("#btnFloat");

function updateScreen() {
  if (previousInput && currentOperator) {
    screen.textContent = `${previousInput} ${currentOperator} ${currentInput || ''}`;
  } else if (previousInput && !currentOperator) {
    // displays the result after eval
    screen.textContent = previousInput;
  } else {
    screen.textContent = currentInput || '0';
  }
}

function appendNumber(number) {
  if (shouldResetScreen) {
    currentInput = '';
    shouldResetScreen = false;
  }
  currentInput += number.trim(); // removes extra spaces
  updateScreen();
}

function handleDecimal() {
  if (shouldResetScreen) {
    currentInput = '0';
    shouldResetScreen = false;
  }
  if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateScreen();
}

function handleOperator(operator) {
  console.log("Operator clicked:", operator);
  operator = operator.trim();
  if (currentInput === '' && previousInput === '') return; // prevents calc. without a number
  
  if (currentInput === '' && previousInput !== '') {
    // if there's a previous result and no new input, just update the operator/sign
    currentOperator = operator;
  } else {
    if (currentOperator !== null) evaluate();
    previousInput = currentInput || previousInput; // use current input if available, otherwise use previous input
    currentInput = '';
    currentOperator = operator;
  }
  
  shouldResetScreen = false;
  console.log("Current state:", { previousInput, currentInput, currentOperator });
  updateScreen();
}

function evaluate() {
  console.log("Evaluating:", { previousInput, currentInput, currentOperator });
  if (currentOperator === null || (currentInput === '' && previousInput === '')) {
    console.log("Evaluation skipped");
    return;
  }
  
// if currentInput is empty, use previousInput (allows repeated pressing of equals)
const num2 = currentInput === '' ? previousInput : currentInput;
  
const result = operate(currentOperator, parseFloat(previousInput), parseFloat(num2));
console.log("Evaluation result:", result);

previousInput = result.toString();
currentInput = '';
currentOperator = null; // clears the operator after eval
updateScreen();
shouldResetScreen = true;
}

function clear() {
  currentInput = '';
  previousInput = '';
  currentOperator = null;
  updateScreen();
}

// EVENT LISTENERS
buttonNumbers.forEach(button => {
  button.addEventListener('click', () => appendNumber(button.textContent));
});

decimalButton.addEventListener('click', handleDecimal);

console.log("Number of operator buttons:", buttonOperators.length);
buttonOperators.forEach(button => {
  console.log("Adding listener to operator button:", button.textContent);
  button.addEventListener('click', () => {
    handleOperator(button.textContent);
    updateScreen(); // updates the screen after operator click
  });
});

buttonEqual.addEventListener('click', evaluate);

buttonClear.addEventListener('click', clear);

// Initialize
updateScreen();