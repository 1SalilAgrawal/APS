document.getElementById("csvFile").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      displayTable(text);
    };
    reader.readAsText(file);
  }
});

function displayTable(csvText) {
  const lines = csvText.trim().split("\n");
  const table = document.createElement("table");

  lines.forEach((line, index) => {
    const row = document.createElement("tr");
    const cells = line.split(",");

    cells.forEach(cell => {
      const cellElement = document.createElement(index === 0 ? "th" : "td");
      cellElement.textContent = cell;
      row.appendChild(cellElement);
    });

    table.appendChild(row);
  });

  const container = document.getElementById("table-container");
  container.innerHTML = "";  // Clear previous
  container.appendChild(table);
}
