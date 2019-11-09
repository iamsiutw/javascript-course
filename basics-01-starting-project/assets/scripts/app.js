const defaultResult = 0
let currentResult = defaultResult;

// Gets input from input field
function getInputNumber() {
  return parseInt(userInput.value)
}

// Generates and writes calculation log
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription); // from vendor.js
}

// Operator function
function add() {
  const calcNumber = getInputNumber();
  const initialNumber = currentResult
  currentResult = currentResult + calcNumber;
  createAndWriteOutput('+', initialNumber, calcNumber)
}

function subtract() {
  const calcNumber = getInputNumber();
  const initialNumber = currentResult
  currentResult = currentResult - calcNumber;
  createAndWriteOutput('-', initialNumber, calcNumber)
}

function multiply() {
  const calcNumber = getInputNumber();
  const initialNumber = currentResult
  currentResult = currentResult * calcNumber;
  createAndWriteOutput('*', initialNumber, calcNumber)
}

function divide() {
  const calcNumber = getInputNumber();
  const initialNumber = currentResult
  currentResult = currentResult / calcNumber;
  createAndWriteOutput('/', initialNumber, calcNumber)
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
