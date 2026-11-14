
function toText(value) {
  // Strings are shown as they are
  if (typeof value === "string") {
    return value;
  }

  // undefined can't be converted by JSON, so handle it first
  if (value === undefined) {
    return "undefined";
  }

  // Arrays and objects -> convert to text with JSON.stringify
  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  // Numbers, booleans, etc.
  return String(value);
}


// -----------------------------------------------------
// STEP 2: Make our own console.log
// Instead of printing in the browser console,
// it prints inside the black output box on the page.
// -----------------------------------------------------
function makeConsole(outputBox) {
  const fakeConsole = {};

  fakeConsole.log = function (...items) {
    let parts = [];

    // convert every item to text
    for (let i = 0; i < items.length; i++) {
      parts.push(toText(items[i]));
    }

    // join them with a space and add as a new line
    const line = document.createElement("div");
    line.textContent = parts.join(" ");
    outputBox.appendChild(line);
  };

  return fakeConsole;
}


// -----------------------------------------------------
// STEP 3: Run the code written inside a textarea
// -----------------------------------------------------
function runCode(textarea, outputBox) {
  outputBox.innerHTML = "";                 // clear old output

  const myConsole = makeConsole(outputBox); // our fake console

  try {
    // new Function(...) turns a string of text into real code.
    // We give it our console, so console.log prints in our box.
    const code = new Function("console", textarea.value);
    code(myConsole);
  } catch (error) {
    // If the student's code has a mistake, show the error
    const line = document.createElement("div");
    line.style.color = "red";
    line.textContent = "Error: " + error.message;
    outputBox.appendChild(line);
  }
}


// -----------------------------------------------------
// STEP 4: Set up every example box on the page
// -----------------------------------------------------
const examples = document.querySelectorAll(".example");

for (let i = 0; i < examples.length; i++) {
  const example = examples[i];
  const textarea = example.querySelector("textarea");

  // Remember the starting code so Reset can bring it back
  const originalCode = textarea.value;

  // Make the textarea tall enough for all the lines
  textarea.rows = textarea.value.split("\n").length;

  // Create a bar with two buttons
  const bar = document.createElement("div");
  bar.className = "bar";

  const runButton = document.createElement("button");
  runButton.textContent = "▶ Run";
  runButton.className = "run";

  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset";
  resetButton.className = "reset";

  bar.appendChild(resetButton);
  bar.appendChild(runButton);

  // Create the output box
  const outputBox = document.createElement("pre");
  outputBox.className = "output";

  // Put the bar above the code and the output below it
  example.insertBefore(bar, textarea);
  example.appendChild(outputBox);

  // When Run is clicked -> run the code
  runButton.onclick = function () {
    runCode(textarea, outputBox);
  };

  // When Reset is clicked -> restore the code and clear the output
  resetButton.onclick = function () {
    textarea.value = originalCode;
    outputBox.innerHTML = "";
  };
}


// -----------------------------------------------------
// STEP 5: Menu button (for small screens)
// -----------------------------------------------------
const menuButton = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuButton.onclick = function () {
  sidebar.classList.toggle("open");   // add the class if missing, remove if present
};


// -----------------------------------------------------
// STEP 6: Dark / Light theme button
// -----------------------------------------------------
const themeButton = document.getElementById("themeBtn");

themeButton.onclick = function () {
  const html = document.documentElement;

  if (html.getAttribute("data-theme") === "dark") {
    html.setAttribute("data-theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
  }
};


// -----------------------------------------------------
// STEP 7: Reading progress bar at the top
// -----------------------------------------------------
const progressBar = document.getElementById("progress");

window.onscroll = function () {
  const scrolled = window.scrollY;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const fraction = scrolled / totalHeight;      // a number from 0 to 1

  progressBar.style.transform = "scaleX(" + fraction + ")";
};