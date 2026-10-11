// 1–4. Examples of conditional statements are shown in the lesson text.
const demoAge = 20;

if (demoAge >= 18) {
  console.log("if: age is 18 or older");
}

if (demoAge >= 18) {
  console.log("if...else: Adult");
} else {
  console.log("if...else: Minor");
}

const demoMarks = 76;

if (demoMarks >= 90) {
  console.log("Grade A");
} else if (demoMarks >= 70) {
  console.log("Grade B");
} else if (demoMarks >= 50) {
  console.log("Grade C");
} else {
  console.log("Needs improvement");
}

// 5. switch statement
const demoDay = "Monday";

switch (demoDay) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("Almost the weekend");
    break;
  default:
    console.log("Another day");
}

// 6. Truthy and falsy examples
console.log(Boolean(""));        // false
console.log(Boolean("false"));  // true
console.log(Boolean(0));         // false
console.log(Boolean([]));        // true

// 7. Logical conditions
const hasTicket = true;
if (demoAge >= 18 && hasTicket) {
  console.log("Age and ticket checks passed.");
}

// 8. Ternary operator
const category = demoAge >= 18 ? "Adult" : "Minor";
console.log(category);

// Interactive grade checker
const gradeForm = document.querySelector("#gradeForm");
const marksInput = document.querySelector("#marks");
const gradeResult = document.querySelector("#gradeResult");

gradeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const rawMarks = marksInput.value.trim();

  if (rawMarks === "") {
    showResult(gradeResult, "Please enter the student's marks.", "error");
    return;
  }

  const marks = Number(rawMarks);

  if (!Number.isFinite(marks) || !Number.isInteger(marks) || marks < 0 || marks > 100) {
    showResult(gradeResult, "Enter a whole number from 0 to 100.", "error");
    return;
  }

  let grade;
  let feedback;

  if (marks >= 90) {
    grade = "A";
    feedback = "Excellent work!";
  } else if (marks >= 70) {
    grade = "B";
    feedback = "Good work!";
  } else if (marks >= 50) {
    grade = "C";
    feedback = "You passed. Keep practising!";
  } else {
    grade = "Needs improvement";
    feedback = "Review the lesson and try again.";
  }

  showResult(gradeResult, `Marks: ${marks}/100. Grade: ${grade}. ${feedback}`, "success");
});

gradeForm.addEventListener("reset", () => {
  window.setTimeout(() => {
    gradeResult.textContent = "Your grade will appear here.";
    gradeResult.className = "result";
  }, 0);
});

// Interactive logical AND example. This is a teaching demo, not real authentication.
const loginForm = document.querySelector("#loginForm");
const loginResult = document.querySelector("#loginResult");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value;

  if (username === "" || password === "") {
    showResult(loginResult, "Please enter both username and password.", "error");
    return;
  }

  if (username === "student" && password === "learn123") {
    showResult(loginResult, "Both conditions are true: demo login approved.", "success");
  } else {
    showResult(loginResult, "At least one condition is false: demo login rejected.", "error");
  }
});

function showResult(element, message, type) {
  element.textContent = message;
  element.className = `result ${type}`;
}
