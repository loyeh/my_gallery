const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const container = document.getElementById("grid_container");
const image = document.getElementById("image");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const close = document.getElementById("close_button");
var m;

for (let i = 1; i < 52; i++) {
  const element = document.createElement("div");
  const image1 = document.createElement("img");
  image1.setAttribute("src", `Img/tumb/piture_${i}.jpg`);
  element.setAttribute("class", "grid_element");
  element.setAttribute("ondblclick", `showImage(${i})`);
  element.classList.add(`item${i}`);
  element.append(image1);
  container.append(element);
}
const images = document.getElementsByClassName("grid_element");
function showImage(n) {
  image.setAttribute("src", `Img/piture_${n}.jpg`);
  popup.classList.add("active");
  overlay.classList.add("active");
  container.classList.add("blur");
  m = n;
  return m;
}
overlay.addEventListener("dblclick", closeImage);
function closeImage() {
  image.setAttribute("src", ``);
  popup.classList.remove("active");
  overlay.classList.remove("active");
  container.classList.remove("blur");
}
close.addEventListener("click", closeImage);
next.addEventListener("click", nextImage);
prev.addEventListener("click", previousImage);
function nextImage() {
  m++;
  showImage(m);
  if (m > 50) {
    next.classList.add("hidden");
  }
  if (m >= 2) {
    prev.classList.remove("hidden");
  }
}
function previousImage() {
  m--;
  showImage(m);

  if (m < 2) {
    prev.classList.add("hidden");
  }
  if (m <= 50) {
    next.classList.remove("hidden");
    // prev.classList.remove("hidden");
  }
}
