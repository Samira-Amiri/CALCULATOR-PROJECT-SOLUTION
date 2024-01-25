// Get the necessary elements from the HTML
const preElement = document.querySelector('.pre');
const currentElement = document.querySelector('.current');
const clearButton = document.getElementById('clear');
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.opertor');
const decimalButton = document.querySelector('.decimal');
const equalButton = document.querySelector('.equal');

let preValue = '';
let currentValue = '';
let currentOperator = '';

// Function to update the current value on the screen
function updateScreen() {
  preElement.textContent = preValue;
  currentElement.textContent = currentValue;
}

// Function to handle number button clicks
function handleNumberClick(number) {
  if (currentValue === '0') {
    currentValue = number;
  } else {
    currentValue += number;
  }
  updateScreen();
}

// Function to handle operator button clicks
function handleOperatorClick(operator) {
  if (currentOperator) {
    performCalculation();
  }
  preValue = currentValue;
  currentValue = '';
  currentOperator = operator;
  updateScreen();
}

// Function to handle decimal button click
function handleDecimalClick() {
  if (!currentValue.includes('.')) {
    currentValue += '.';
    updateScreen();
  }
}

// Function to perform the calculation
function performCalculation() {
  const preNum = parseFloat(preValue);
  const currentNum = parseFloat(currentValue);
  if (isNaN(preNum) || isNaN(currentNum)) {
    return;
  }

  let result;
  switch (currentOperator) {
    case '+':
      result = preNum + currentNum;
      break;
    case '-':
      result = preNum - currentNum;
      break;
    case 'x':
      result = preNum * currentNum;
      break;
    case '/':
      result = preNum / currentNum;
      break;
    default:
      return;
  }

  currentValue = result.toString();
  preValue = '';
  currentOperator = '';
  updateScreen();
}

// Function to clear the calculator
function clearCalculator() {
  preValue = '';
  currentValue = '0';
  currentOperator = '';
  updateScreen();
}

// Add event listeners to the buttons
numberButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    handleNumberClick(button.textContent);
  });
});

operatorButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    handleOperatorClick(button.textContent);
  });
});

decimalButton.addEventListener('click', handleDecimalClick);
equalButton.addEventListener('click', performCalculation);
clearButton.addEventListener('click', clearCalculator);