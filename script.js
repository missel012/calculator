const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "=", "(", ")"];
let output = "";

// Define function to calculate based on button clicked
const calculate = (btnValue) => {
  display.focus();

  if (btnValue === "=") {
    // Check if the equation is not solvable
    try {
      eval(output);
    } catch (error) {
      display.value = "Syntax Error";
      return;
    }

    // Check if the output is empty
    if (output.trim() === "") {
      display.value = "Syntax Error";
      return;
    }

    // If output has '%', replace with '/100' before evaluating
    output = eval(output.replace("%", "/100"));
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    // If DEL button is clicked, remove the last character from the output
    output = output.toString().slice(0, -1);
  } else {
    // Handle consecutive (-) at the beginning
    if (output === "" && btnValue === "-") {
      output += btnValue;
    } else if (
      (btnValue === "-" || btnValue === "(") &&
      (output === "" || specialChars.includes(output.slice(-1)))
    ) {
      output += btnValue;
    } else {
      // Handle multiplication when parenthesis is not paired with other operations
      if (btnValue === "(" && !specialChars.includes(output.slice(-1))) {
        output += "*";
      }

      // Handle negative numbers and parentheses
      if (
        (btnValue === "-" &&
          (output.slice(-1) !== "-" &&
            !output.endsWith(" ") &&
            !output.endsWith("("))) ||
        (btnValue === "(" && !output.endsWith(" "))
      ) {
        output += btnValue;
      } else if (specialChars.includes(btnValue)) {
        // Check if the last character is a special character, if so, replace it with the new one
        if (specialChars.includes(output.slice(-1))) {
          output = output.slice(0, -1) + btnValue;
        } else {
          output += " " + btnValue + " ";
        }
      } else {
        output += btnValue;
      }
    }
  }

  display.value = output;
};

// Add event listener to buttons, call calculate() on click
buttons.forEach((button) => {
  // Button click listener calls calculate() with dataset value as argument
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
