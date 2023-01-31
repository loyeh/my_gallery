const container = document.createElement("div");
container.setAttribute("class", "grid_container");
const popup = document.createElement("div");
popup.setAttribute("class", "popup");
const image = document.createElement("img");
popup.appendChild(image);
document.body.appendChild(container);
document.body.appendChild(popup);
for (let i = 1; i < 52; i++) {
  const element = document.createElement("div");
  const image1 = document.createElement("img");
  image1.setAttribute("src", `Img/tumb/piture_${i}.jpg`);
  element.setAttribute("class", "grid_element");
  element.setAttribute("onclick", `showImage(${i})`);
  element.classList.add(`item${i}`);
  element.append(image1);
  container.append(element);
}
const images = document.getElementsByClassName("grid_element");
function showImage(n) {
  image.setAttribute("src", `Img/piture_${n}.jpg`);
  popup.classList.toggle("active");
}
