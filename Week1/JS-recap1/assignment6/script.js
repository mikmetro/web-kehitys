const enteredNumber = parseInt(prompt("Enter multiplication table limit"));

const table = document.createElement("table");

for (let i = 1; i <= enteredNumber; i++) {
  const tableRow = document.createElement("tr");
  for (let j = 1; j <= enteredNumber; j++) {
    const tableData = document.createElement("td");
    tableData.textContent = i * j;
    tableRow.append(tableData);
  }
  table.append(tableRow);
}

document.body.append(table);
