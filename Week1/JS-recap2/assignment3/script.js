const numbers = [];

while (true) {
  const response = prompt("Enter a number (or 'done' to finish)");

  if (response === "done") break;

  numbers.push(parseInt(response));
}

for (const i of numbers) {
  if (i % 2 == 0) {
    addContainerWithText(i);
  }
}

addContainerWithText("Done");

function addContainerWithText(text) {
  const numbersDisplay = document.createElement("p");
  numbersDisplay.textContent = text;
  document.body.append(numbersDisplay);
}
