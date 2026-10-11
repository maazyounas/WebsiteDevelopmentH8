// 1. console.log(): sends output to the browser developer console.
document.querySelector("#consoleDemo").addEventListener("click", () => {
  console.log("Hello! This message came from console.log().");
  console.log("5 + 3 =", 5 + 3);
});

// 2. alert(): displays a simple browser message dialog.
document.querySelector("#alertDemo").addEventListener("click", () => {
  alert("Hello! This message is shown using alert().");
});

// 3. prompt(): asks the user for text. Cancel returns null.
document.querySelector("#promptDemo").addEventListener("click", () => {
  const name = prompt("What is your name?");

  if (name === null) {
    alert("You cancelled the prompt.");
    return;
  }

  const cleanedName = name.trim();
  if (cleanedName === "") {
    alert("You did not enter a name.");
    return;
  }

  alert(`Hello, ${cleanedName}!`);
});

// 4. confirm(): returns true for OK and false for Cancel.
document.querySelector("#confirmDemo").addEventListener("click", () => {
  const answer = confirm("Do you want to continue?");
  const output = document.querySelector("#confirmResult");

  output.textContent = answer
    ? "You clicked OK. confirm() returned true."
    : "You clicked Cancel. confirm() returned false.";
});

// 5. Read a value from an HTML input field.
document.querySelector("#readName").addEventListener("click", () => {
  const name = document.querySelector("#studentName").value.trim();
  const output = document.querySelector("#nameOutput");

  output.textContent = name === ""
    ? "Please enter a name first."
    : `You entered: ${name}`;
});

// 6. Convert text to a number and do arithmetic.
document.querySelector("#convertNumber").addEventListener("click", () => {
  const rawValue = document.querySelector("#numberText").value.trim();
  const output = document.querySelector("#conversionOutput");

  if (rawValue === "") {
    output.textContent = "Please enter a number.";
    return;
  }

  const number = Number(rawValue);

  if (!Number.isFinite(number)) {
    output.textContent = "Invalid number. Try a value such as 25 or 3.5.";
    return;
  }

  output.textContent = `Number(raw input) + 5 = ${number + 5}`;
});

// 7. Display a result inside an HTML element with textContent.
document.querySelector("#displayResult").addEventListener("click", () => {
  document.querySelector("#htmlOutput").textContent =
    "Success! JavaScript updated this HTML element.";
});

// 8. Validate a form, process the values, then display output in HTML.
const ageForm = document.querySelector("#ageForm");
const formMessage = document.querySelector("#formMessage");

ageForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop the browser from reloading the page.

  const name = document.querySelector("#fullName").value.trim();
  const rawAge = document.querySelector("#age").value.trim();

  // Check required fields before converting or calculating.
  if (name === "") {
    showMessage("Please enter your name.", "error");
    return;
  }

  if (rawAge === "") {
    showMessage("Please enter your age.", "error");
    return;
  }

  const age = Number(rawAge);

  if (!Number.isFinite(age) || !Number.isInteger(age) || age < 0 || age > 120) {
    showMessage("Enter a whole-number age from 0 to 120.", "error");
    return;
  }

  const category = age >= 18 ? "an adult" : "a minor";
  showMessage(`Hello, ${name}! You are ${age} years old, so you are ${category}.`, "success");
});

ageForm.addEventListener("reset", () => {
  // Let the form reset its fields before clearing the message.
  window.setTimeout(() => {
    formMessage.textContent = "Enter your details to begin.";
    formMessage.className = "form-message";
  }, 0);
});

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}
