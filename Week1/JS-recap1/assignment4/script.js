const THRESHOLDS = [40, 52, 64, 76, 88];

const score = parseFloat(prompt("Enter course score (0 - 100)"));

const resultContainer = document.createElement("p");

let grade = 0;
for (const i in THRESHOLDS) {
  if (score >= THRESHOLDS[i]) grade++;
}

resultContainer.textContent = `Your grade is: ${grade}`;
document.body.appendChild(resultContainer);
