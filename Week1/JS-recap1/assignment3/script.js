const sides = prompt(
  "Enter the 3 sides of a triangle seperated by a comma (3,4,5)",
)
  .split(",")
  .map((i) => parseFloat(i));

const resultContainer = document.createElement("p");

if (sides[0] == sides[1] && sides[1] == sides[2]) {
  resultContainer.textContent = "Triangle is equilateral";
} else if (
  sides[0] == sides[1] ||
  sides[1] == sides[2] ||
  sides[0] == sides[2]
) {
  resultContainer.textContent = "Triangle is isosceles";
} else {
  resultContainer.textContent = "Triangle is scalene";
}

document.body.append(resultContainer);
