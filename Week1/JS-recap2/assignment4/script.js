const arr = [25, 5, -1, 50, -5, 10, 1];
console.log(arr);
console.log(sortArray(arr));

function sortArray(array) {
  return array.toSorted((a, b) => a - b);
}
