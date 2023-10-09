let sign = "";
let currentNumber = sign;
let fullOperation = "";
let result = 0;
let operation = "";
let reset = false;

const smallScreen = document.getElementById("smallScreen");
const mainScreen = document.getElementById("mainScreen");
const buttonsBox = document.getElementById("buttonsBox");

buttonsBox.addEventListener("click", function (event) {
  if (reset) resetCalculator();

  if (event.target.hasAttribute("data-number")) {
    currentNumber += event.target.textContent;
    mainScreen.textContent = currentNumber;
  } else if (event.target.hasAttribute("data-operation")) {
    chosenOperation(event.target);
  } else if (event.target.id == "clear") resetCalculator();
  else if (event.target.id == "decimal") addDecimal();
  else if (event.target.id == "delete") backspace();
  else if (event.target.id == "equal") equal();
  else if (event.target.id == "negToPos") changeSign();
});

function chosenOperation(target) {
  if (target.textContent == "+") {
    operation = "+";
    screensController();
  } else if (target.textContent == "/") {
    operation = "/";
    screensController();
  } else if (target.textContent == "X") {
    operation = "X";
    screensController();
  } else if (target.textContent == "-") {
    operation = "-";
    screensController();
  }
}
function screensController() {
  if (fullOperation.length == 0) {
    fullOperation += currentNumber + " " + operation;
    currentNumber = "";
    smallScreen.textContent = fullOperation;
    mainScreen.textContent = "0";

    return;
  }
  fullOperation += " " + currentNumber;
  result = calculate();
  console.log(result);
  fullOperation =
    result.toString().indexOf(".") !== -1
      ? result.toFixed(5) + " " + operation
      : result + " " + operation;
  currentNumber = "";
  mainScreen.textContent = "0";
  smallScreen.textContent = fullOperation;
}

function equal() {
  if (operation.length == 0) return;
  fullOperation += " " + currentNumber;
  result = calculate();

  mainScreen.textContent =
    Number(result) === result && result % 1 !== 0 ? result.toFixed(5) : result;
  smallScreen.textContent = fullOperation;
  reset = true;
}

function calculate() {
  const [first, operation, second] = fullOperation.split(" ");
  if (operation == "+") {
    return Number(first) + Number(second);
  } else if (operation == "-") {
    return Number(first) - Number(second);
  } else if (operation == "X") {
    return Number(first) * Number(second);
  } else if (operation == "/") {
    return Number(first) / Number(second);
  }
}
function backspace() {
  currentNumber = currentNumber.slice(0, -1);
  mainScreen.textContent = currentNumber.length > 0 ? currentNumber : "0";
}
function resetCalculator() {
  currentNumber = "";
  fullOperation = "";
  result = 0;
  operation = "";
  reset = false;
  mainScreen.textContent = "0";
  smallScreen.textContent = "";
}
function addDecimal() {
  if (currentNumber.includes(".")) return;
  currentNumber += Number(currentNumber) == 0 ? "0." : ".";
  mainScreen.textContent = currentNumber;
}
function changeSign() {
  if (currentNumber.length == 0) {
    return;
  }

  if (currentNumber.includes("-")) {
    currentNumber = currentNumber.replace("-", " ");
  } else if (currentNumber.includes("-") == false) {
    currentNumber = "-" + currentNumber;
  }

  mainScreen.textContent = currentNumber;
}
