'use strict';

// Hämtar alla knappar i kalkylatorn och displayen
const buttons = document.querySelectorAll(".calculator button");
const display = document.querySelector(".result");

let currentInput = ""; // aktuell inmatning
let operator = ""; // aktuell operator
let firstNum = ""; // första talet
let secondNum = ""; // andra talet
let expression = ""; // uttryck som visas i displayen
let showResult = false; // Om resultatet ska visas

// Funktion för att uppdatera displayen
function updateDisplay(value) {
  if (value) {
    display.textContent = value;
  } else {
    display.textContent = '0';
  }
}

// Initiera displayen
updateDisplay('0');

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent; // Hämtar värdet av den tryckta knappen

    // Rensar alla variabler när knappen "C" trycks
    if (button.classList.contains('clear')) {
      currentInput = "";
      operator = "";
      firstNum = "";
      secondNum = "";
      expression = "";
      showResult = false;
      updateDisplay('0');
      return;
    }

    // När knappen '=' trycks görs beräkningen
    if (button.classList.contains('equals')) {
      if (firstNum && operator && currentInput) {
        secondNum = currentInput;

        // Omvandla båda numren till tal för korrekt beräkning
        const result = calculate(parseFloat(firstNum), operator, parseFloat(secondNum));

        // Om resultatet är ett tal, avrunda till 2 decimaler, annars visa som fel
        let roundedResult = result;
        if (typeof result === 'number') {
          roundedResult = Math.round(result * 100) / 100;
        }

        updateDisplay(roundedResult);

        // Förbereda för nästa beräkning
        firstNum = roundedResult.toString();
        secondNum = "";
        operator = "";
        currentInput = "";
        expression = "";
        showResult = true;
      }
      return;
    }

    // Hantera operatorerna
    if (button.classList.contains('plus') ||
      button.classList.contains('minus') ||
      button.classList.contains('multiply') ||
      button.classList.contains('divide')) {

      let operatorValue = '';

      // Bestäm vilken operator som valts baserat på knapptryckning
      if (button.classList.contains('plus')) {
        operatorValue = '+';
      } else if (button.classList.contains('minus')) {
        operatorValue = '-';
      } else if (button.classList.contains('multiply')) {
        operatorValue = '*';
      } else if (button.classList.contains('divide')) {
        operatorValue = '/';
      }

      // Om vi har ett giltigt tal och en operator, gör beräkning och uppdatera displayen
      if (firstNum && currentInput && operator) {
        secondNum = currentInput;

        // Omvandla numren till float och beräkna resultatet
        const result = calculate(parseFloat(firstNum), operator, parseFloat(secondNum));

        let roundedResult = result;
        if (typeof result === 'number') {
          roundedResult = Math.round(result * 100) / 100;
        }

        updateDisplay(roundedResult);

        // Uppdatera första numret till det beräknade resultatet
        firstNum = roundedResult.toString();
        secondNum = "";
        currentInput = "";
        operator = operatorValue;
        expression = firstNum + getOperatorDisplay(operatorValue);
        updateDisplay(expression);
      } else if (!firstNum && currentInput) {
        // Om vi inte har något första tal, sätt första numret och välj operator
        firstNum = currentInput;
        currentInput = "";
        operator = operatorValue;
        expression = firstNum + getOperatorDisplay(operatorValue);
        updateDisplay(expression);
      } else if (firstNum && !currentInput) {
        // Om vi endast har ett första tal och byter operator
        operator = operatorValue;
        expression = firstNum + getOperatorDisplay(operatorValue);
        updateDisplay(expression);
      }

      showResult = false;
      return;
    }

    // Förhindra att man kan skriva flera punkter
    if (value === '.' && currentInput.includes('.')) {
      return;
    }

    // Om resultatet har visats tidigare, rensa allt innan ny inmatning
    if (showResult) {
      firstNum = '';
      currentInput = '';
      expression = '';
      showResult = false;
    }

    // Lägg till siffra eller decimal till aktuella värdet
    currentInput += value;

    // Uppdatera vad som visas i displayen
    if (firstNum && operator) {
      expression = firstNum + (operator === '*' ? 'x' : operator === '/' ? '÷' : operator) + currentInput;
    } else {
      expression = currentInput;
    }

    updateDisplay(expression);
  });
});

// Hjälpfunktion för att få korrekt visning av operatorer
function getOperatorDisplay(op) {
  switch (op) {
    case '*':
      return 'x';
    case '/':
      return '÷';
    default:
      return op;
  }
}

// Funktion för att göra själva beräkningarna
function calculate(num1, op, num2) {
  switch (op) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) {
        return 'Error';  // Hantera division med 0
      }
      return num1 / num2;
    default:
      return 'Error';  // Om operationen inte känns igen
  }
}



