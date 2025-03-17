const points = [...getPoint(), ...getPoint()];

const resultContainer = document.createElement("p");

if (points.includes(undefined) || points.length != 4) {
  resultContainer.textContent = "Invalid input!";
} else {
  const [x1, y1, x2, y2] = points;
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  resultContainer.textContent = `Distance between points (${x1}, ${y1}) and (${x2}, ${y2}) is ${distance}`;
}

document.body.append(resultContainer);

function getPoint() {
  const promptResult = prompt(
    'Enter a point using a comma as a seperator "x,y"',
  );
  const [x, y] = promptResult.split(",");

  return [parseFloat(x), parseFloat(y)];
}
