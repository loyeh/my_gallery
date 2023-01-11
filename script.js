const container = document.createElement("div");
container.setAttribute("class", "grid_container");
document.body.appendChild(container);
for (let i = 1; i < 52; i++) {
  const element = document.createElement("div");
  const image = document.createElement("img");
  image.setAttribute("src", `Img/tumb/piture_${i}.jpg`);
  element.setAttribute("class", "grid_element");
  element.classList.add(`item${i}`);
  element.append(image);
  container.append(element);
}
