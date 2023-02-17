/* Creating the grid */
function grid(el) {
  const container = document.createElement("div");
  container.id = "main";
  container.className = "container";

  for (i = 0; i < 16; i += 1) {
    const row = document.createElement("div");
    row.className = "row";
    row.id = `row${i}`;

    for (k = 0; k < 16; k += 1) {
      const box = document.createElement("div");
      box.className = "box";
      row.appendChild(box);
    }

    container.appendChild(row);
  }

  el.appendChild(container);
}

grid(document.body);
