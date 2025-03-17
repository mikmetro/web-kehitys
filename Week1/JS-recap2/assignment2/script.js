function addContainerWithText(text) {
  const numbersDisplay = document.createElement("p");
  numbersDisplay.textContent = text;
  document.body.append(numbersDisplay);
}

const numbers = [];

for (let i = 1; i <= 5; i++) {
  numbers.push(parseInt(prompt(`Enter number ${i}`)));
}

addContainerWithText(`Numbers: ${numbers}`);

const numberToLookup = parseInt(prompt("Enter a number to search"));

if (numbers.includes(numberToLookup))
  addContainerWithText(`Number ${numberToLookup} is found in the array`);
else addContainerWithText(`Number ${numberToLookup} is not found in the array`);

numbers.pop();
addContainerWithText(`Updated Numbers: ${numbers}`);

numbers.sort((a, b) => a - b);
addContainerWithText(`Updated Numbers: ${numbers}`);
