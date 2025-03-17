const stopValue = parseInt(prompt("Enter a positive number"));

resultContainer = document.createElement("p");

if (stopValue <= 0) {
  resultContainer.textContent = "Invalid input!";
} else {
  let result = 0;
  for (let i = 1; i <= stopValue; i++) {
    result += i;
  }
  resultContainer.textContent = `Result: ${result}`;
}

document.body.append(resultContainer);
