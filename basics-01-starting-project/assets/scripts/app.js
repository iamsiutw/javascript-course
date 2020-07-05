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

function calculatResult(calculationType) {
  const calcNumber = getInputNumber();
  const initialNumber = currentResult
  let mathOperator;
  if (calculationType === 'ADD') {
    currentResult += calcNumber;
    mathOperator = '+';
  } else if (calculationType === 'SUBTRACT') {
    currentResult -= calcNumber;
    mathOperator = '-';
  } else if (calculationType === 'MULTIPLY') {
    currentResult *= calcNumber;
    mathOperator = '*';
  } else if (calculationType === 'DEVIDED') {
    currentResult /= calcNumber;
    mathOperator = '/';
  }
  createAndWriteOutput(mathOperator, initialNumber, calcNumber);
  writeToLog(calculationType, initialNumber, calcNumber, currentResult);
}

addBtn.addEventListener('click', calculatResult.bind(this, 'ADD'));
subtractBtn.addEventListener('click', calculatResult.bind(this, 'SUBTRACT'));
multiplyBtn.addEventListener('click', calculatResult.bind(this, 'MULTIPLY'));
divideBtn.addEventListener('click', calculatResult.bind(this, 'DEVIDED'));
