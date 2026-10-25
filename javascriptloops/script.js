"use strict";

const $ = (selector) => document.querySelector(selector);

function writeResult(selector, lines) {
  const element = $(selector);
  if (element) element.textContent = lines.join("\n");
}

function readInteger(selector, { min = -1000, max = 1000 } = {}) {
  const input = $(selector);
  const value = input.valueAsNumber;

  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`Enter a whole number from ${min} to ${max}.`);
  }

  return value;
}

function runSafely(resultSelector, callback) {
  try {
    callback();
  } catch (error) {
    const target = $(resultSelector);
    if (target) target.textContent = error.message;
  }
}

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (action === "for-demo") {
      runSafely("#forResult", () => {
        const start = readInteger("#forStart");
        const end = readInteger("#forEnd");
        const step = readInteger("#forStep", { min: -1000, max: 1000 });

        if (step === 0) throw new Error("Step cannot be 0.");
        if (start < end && step < 0) throw new Error("Use a positive step when counting upward.");
        if (start > end && step > 0) throw new Error("Use a negative step when counting downward.");

        const values = [];
        for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
          values.push(i);
          if (values.length > 2000) throw new Error("This demo is limited to 2,000 values.");
        }
        writeResult("#forResult", values.length ? values : ["No iterations: the condition is false at the start."]);
      });
    }

    if (action === "while-demo") {
      runSafely("#whileResult", () => {
        const limit = readInteger("#whileLimit", { min: 0, max: 30 });
        let i = 1;
        const values = [];
        while (i <= limit) {
          values.push(i);
          i++;
        }
        writeResult("#whileResult", values.length ? values : ["The condition was false initially, so the body ran zero times."]);
      });
    }

    if (action === "do-demo") {
      runSafely("#doResult", () => {
        let number = readInteger("#doStart");
        const limit = readInteger("#doLimit");
        const values = [];

        // The body executes at least once, matching do...while semantics.
        do {
          values.push(number);
          number++;
        } while (number < limit && values.length < 100);

        if (values.length === 100 && number < limit) values.push("… output limited");
        writeResult("#doResult", values);
      });
    }

    if (action === "grid-demo") {
      runSafely("#gridResult", () => {
        const size = readInteger("#gridSize", { min: 1, max: 10 });
        const lines = [];
        for (let row = 1; row <= size; row++) {
          let line = "";
          for (let col = 1; col <= size; col++) line += "* ";
          lines.push(line.trimEnd());
        }
        writeResult("#gridResult", lines);
      });
    }

    if (action === "break-demo") {
      const values = [];
      for (let i = 1; i <= 10; i++) {
        if (i === 5) break;
        values.push(i);
      }
      writeResult("#controlResult", [
        "break when i === 5:",
        values.join(", "),
        "The loop ends immediately when break runs."
      ]);
    }

    if (action === "continue-demo") {
      const values = [];
      for (let i = 1; i <= 10; i++) {
        if (i === 5) continue;
        values.push(i);
      }
      writeResult("#controlResult", [
        "continue when i === 5:",
        values.join(", "),
        "Only the iteration where i is 5 is skipped."
      ]);
    }

    if (action === "trace-demo") {
      runSafely("#traceResult", () => {
        const limit = readInteger("#traceLimit", { min: 1, max: 20 });
        const container = $("#traceResult");
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const header = document.createElement("tr");

        ["Iteration", "i", "Old sum", "New sum"].forEach((text) => {
          const th = document.createElement("th");
          th.textContent = text;
          header.appendChild(th);
        });
        thead.appendChild(header);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        let sum = 0;

        for (let i = 1; i <= limit; i++) {
          const oldSum = sum;
          sum += i;
          const row = document.createElement("tr");

          [i, i, oldSum, sum].forEach((value) => {
            const td = document.createElement("td");
            td.textContent = String(value);
            row.appendChild(td);
          });

          tbody.appendChild(row);
        }

        table.appendChild(tbody);
        container.replaceChildren(table);

        const summary = document.createElement("p");
        summary.textContent = `Final sum = ${sum}`;
        container.appendChild(summary);
      });
    }
  });
});

$("#quizForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const answers = { q1: "c", q2: "b", q3: "b", q4: "a", q5: "c" };
  const formData = new FormData(event.currentTarget);
  let score = 0;
  let unanswered = 0;

  for (const [question, correct] of Object.entries(answers)) {
    const answer = formData.get(question);
    if (!answer) unanswered++;
    if (answer === correct) score++;
  }

  const result = $("#quizResult");
  result.textContent = unanswered
    ? `You scored ${score}/5. Please answer all questions; ${unanswered} question(s) are unanswered.`
    : `You scored ${score}/5. ${score === 5 ? "Excellent work!" : "Review the explanations above and try again."}`;
});

$("#quizForm").addEventListener("reset", () => {
  $("#quizResult").textContent = "";
});
