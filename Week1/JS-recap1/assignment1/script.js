const KELVIN_DIFFERENCE = 273.15;

const celsius = parseFloat(prompt("Enter a number in celcius"));

const fahrenheit = celsius * (9 / 5) + 32;
const kelvin = celsius + KELVIN_DIFFERENCE;

const fahrenheitContainer = document.createElement("p");
fahrenheitContainer.textContent = `${celsius} Celsius in fahrenheit: ${fahrenheit.toFixed(2)}`;

const kelvinContainer = document.createElement("p");
kelvinContainer.textContent = `${celsius} Celsius in kelvin: ${kelvin.toFixed(2)}`;

document.body.append(fahrenheitContainer, kelvinContainer);
