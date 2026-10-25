

function showOutput(topic, message) {
    const output = document.getElementById("output-" + topic);

    if (output) {
        output.textContent = message;
    }
}


// ============================================
// 1. WHAT IS A FUNCTION?
// ============================================

function sayHello() {
    return "Hello Students!";
}

function runIntroduction() {
    // Call the function and store its return value.
    const result = sayHello();

    showOutput("intro", result);
}


// ============================================
// 2. FUNCTION DECLARATION
// ============================================

function welcome() {
    return "Welcome to JavaScript!";
}

function runDeclaration() {
    showOutput("declaration", welcome());
}


// ============================================
// 3. FUNCTION EXPRESSION
// ============================================

const greetMorning = function () {
    return "Good morning!";
};

function runExpression() {
    showOutput("expression", greetMorning());
}


// ============================================
// 4. PARAMETERS AND ARGUMENTS
// ============================================

function greetStudent(name) {
    return "Hello " + name + "! Welcome to class.";
}

function runParameters() {
    const name = document
        .getElementById("studentName")
        .value
        .trim();

    if (name === "") {
        showOutput("parameters", "Please enter a student's name.");
        return;
    }

    // The entered name is passed as an argument.
    const result = greetStudent(name);

    showOutput("parameters", result);
}


// ============================================
// 5. RETURN VALUES
// ============================================

function add(a, b) {
    return a + b;
}

function runReturn() {
    const valueA = document.getElementById("numberA").value;
    const valueB = document.getElementById("numberB").value;

    if (valueA.trim() === "" || valueB.trim() === "") {
        showOutput("return", "Please enter both numbers.");
        return;
    }

    const a = Number(valueA);
    const b = Number(valueB);

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        showOutput("return", "Please enter valid numbers.");
        return;
    }

    const result = add(a, b);

    showOutput("return", "Result: " + result);
}


// ============================================
// 6. DEFAULT PARAMETERS
// ============================================

function greetGuest(name = "Guest") {
    return "Welcome, " + name + "!";
}

function runDefault() {
    const name = document
        .getElementById("guestName")
        .value
        .trim();

    // An empty input uses the function's default value.
    const result = name === ""
        ? greetGuest()
        : greetGuest(name);

    showOutput("default", result);
}


// ============================================
// 7. ARROW FUNCTIONS
// ============================================

// An arrow function with a concise expression body.
const square = number => number * number;

function runArrow() {
    const number = 5;
    const result = square(number);

    showOutput(
        "arrow",
        "square(5) = " + result +
        "\n5 × 5 = " + result
    );
}


// ============================================
// 8. ANONYMOUS FUNCTIONS
// ============================================

// This function expression has no function name.
const anonymousGreeting = function () {
    return "Hello! This message came from an anonymous function.";
};

function runAnonymous() {
    showOutput("anonymous", anonymousGreeting());
}


// ============================================
// 9. CALLBACK FUNCTIONS
// ============================================

function processMessage(callback) {
    // Execute the function passed as an argument.
    return callback();
}

function runCallback() {
    const result = processMessage(function () {
        return "The callback function has been executed!";
    });

    showOutput("callback", result);
}


// ============================================
// 10. GLOBAL AND LOCAL VARIABLES
// ============================================

// Global variable: declared outside the functions.
const school = "ABC School";

function getSchoolName() {
    return school;
}

function getStudentName() {
    // Local variable: available inside this function.
    const student = "Ali";

    return student;
}

function runScope() {
    const globalResult = getSchoolName();
    const localResult = getStudentName();

    showOutput(
        "scope",
        "Global variable: " + globalResult +
        "\nLocal variable: " + localResult +
        "\nThe local variable 'student' cannot be accessed here."
    );
}


// ============================================
// 11. FUNCTION SCOPE AND BLOCK SCOPE
// ============================================

function checkMarks() {
    let marks = 80;
    let message = "";

    if (marks >= 50) {
        let result = "Pass";

        message += "Inside the if block: " + result + "\n";
    }

    message += "Inside the function: marks = " + marks;

    // The variable result is not available here.
    // console.log(result); // ReferenceError

    return message;
}

function runFunctionScope() {
    showOutput("function-scope", checkMarks());
}


// ============================================
// 12. BASIC FUNCTION HOISTING
// ============================================

// This function declaration can be called before
// its definition in the same scope.
function hoistedGreeting() {
    return "Welcome! Function declarations support hoisting.";
}

function runHoisting() {
    const result = hoistedGreeting();

    showOutput("hoisting", result);
}


// ============================================
// CONNECT ALL RUN EXAMPLE BUTTONS
// ============================================

const examples = {
    intro: runIntroduction,
    declaration: runDeclaration,
    expression: runExpression,
    parameters: runParameters,
    return: runReturn,
    default: runDefault,
    arrow: runArrow,
    anonymous: runAnonymous,
    callback: runCallback,
    scope: runScope,
    "function-scope": runFunctionScope,
    hoisting: runHoisting
};

document.querySelectorAll("[data-run]").forEach(function (button) {
    button.addEventListener("click", function () {
        const topic = button.dataset.run;
        const runExample = examples[topic];

        if (runExample) {
            runExample();
        }
    });
});
