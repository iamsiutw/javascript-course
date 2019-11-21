const defaultResult = 0
let currentResult = defaultResult;
let logEntries = [];

// Gets input from input field
function getInputNumber() {
  return parseInt(userInput.value)
}

// Generates and writes calculation log
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription); // from vendor.js
}

function writeToLog(operationIdentifier, prevResult, calcNumber, newResult) {
  const logEntry = {
    operator: operationIdentifier,
    prevResult: prevResult,
    number: calcNumber,
    result: newResult
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

// Operator function
function add() {
  const calcNumber = getInputNumber();
  const initialNumber = currentResult
  currentResult += calcNumber;
  createAndWriteOutput('+', initialNumber, calcNumber);
  writeToLog('ADD', initialNumber, calcNumber, currentResult);
}

function subtract() {
  const calcNumber = getInputNumber();
  const initialNumber = currentResult
  currentResult -= calcNumber;
  createAndWriteOutput('-', initialNumber, calcNumber)
  writeToLog('SUBTRACT', initialNumber, calcNumber, currentResult);
}

function multiply() {
  const calcNumber = getInputNumber();
  const initialNumber = currentResult
  currentResult *= calcNumber;
  createAndWriteOutput('*', initialNumber, calcNumber);
  writeToLog('MULTIPLY', initialNumber, calcNumber, currentResult);
}

function divide() {
  const calcNumber = getInputNumber();
  const initialNumber = currentResult
  currentResult /= calcNumber;
  createAndWriteOutput('/', initialNumber, calcNumber);
  writeToLog('DEVIDED', initialNumber, calcNumber, currentResult);
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
