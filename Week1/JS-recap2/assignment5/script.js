const sortingOrders = {
  asc: (a, b) => a - b,
  desc: (a, b) => b - a,
};

const arr = [25, 5, -1, 50, -5, 10, 1];
console.log(sortArray(arr, "asc"));
console.log(sortArray(arr, "desc"));

function sortArray(array, order) {
  return array.toSorted(sortingOrders[order]);
}
