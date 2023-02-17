const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const container = document.getElementById("grid_container");
const background_image = document.getElementById("background_image");
const image = document.getElementById("image");
const next = document.getElementById("next");
const main = document.getElementById("main");
const prev = document.getElementById("prev");
const close = document.getElementById("close_button");
let enlarged_image_number;
const grid_elements = document.getElementsByClassName("grid_element");
const selected = document.getElementsByClassName("selected");

// generating the tumbnail grid in the document object

for (let i = 1; i < 52; i++) {
  const element = document.createElement("div");
  const image1 = document.createElement("img");
  image1.setAttribute("src", `Img/tumb/piture_${i}.jpg`);
  element.setAttribute("class", "grid_element");
  element.setAttribute("ondblclick", `showImage(${i})`);
  element.id = `item${i}`;
  element.append(image1);
  container.append(element);
}

function showImage(n) {
  image.setAttribute("src", `Img/piture_${n}.jpg`);
  background_image.setAttribute("src", `Img/tumb/piture_${n}.jpg`);
  popup.classList.add("active");
  overlay.classList.add("active");
  container.classList.add("blur");
  enlarged_image_number = n;
  if (enlarged_image_number > 50) {
    next.classList.add("hidden");
  }
  if (enlarged_image_number >= 2) {
    prev.classList.remove("hidden");
  }
  if (enlarged_image_number < 2) {
    prev.classList.add("hidden");
  }
  if (enlarged_image_number <= 50) {
    next.classList.remove("hidden");
  }
  return enlarged_image_number;
}

function closeImage() {
  image.setAttribute("src", ``);
  popup.classList.remove("active");
  overlay.classList.remove("active");
  container.classList.remove("blur");
}

function nextImage() {
  enlarged_image_number++;
  if (enlarged_image_number == 52) {
    enlarged_image_number = 51;
  }
  showImage(enlarged_image_number);
}

function previousImage() {
  enlarged_image_number--;
  if (enlarged_image_number == 0) {
    enlarged_image_number = 1;
  }
  showImage(enlarged_image_number);
}
function unSelectedImage() {
  this.classList.remove("selected");
  background_image.setAttribute("src", "");
}

function selectedImage(event) {
  for (let i = 0; i < grid_elements.length; i++) {
    grid_elements[i].classList.remove("selected");
  }
  event.target.parentNode.classList.add("selected");
  let urlText = event.target.src.slice(21);
  background_image.setAttribute("src", urlText);
  console.log(event.target.parentElement);
}

function nextImageSelection() {
  selected[0].nextElementSibling.classList.add("selected");
  selected[0].nextElementSibling.focus();
  selected[0].classList.remove("selected");
  selected[0].blur();
}

function previouseImageSelection() {
  selected[0].previousElementSibling.classList.add("selected");
  selected[0].previousElementSibling.focus();
  selected[0].classList.remove("selected");
  selected[0].blur();
}

function mouseAction(event) {
  let direction = event.deltaY;
  if (direction > 0) {
    nextImageSelection();
  } else {
    previouseImageSelection();
  }
}

function mouseScroll(event) {
  console.log(event);
  let direction = event.deltaY;
  if ($("#popup").hasClass("active")) {
    if (direction < 0) previousImage();
    else nextImage();
  } else {
    mouseAction(event);
  }
}

function keyboardAction(event) {
  let pressedKey = event.key;
  console.log(event);
  console.log(selected);

  if (pressedKey == "ArrowRight") {
    nextImageSelection();
  }
  if (pressedKey == "ArrowLeft") {
    previouseImageSelection();
  }
  if (pressedKey == "Enter") {
    let selectedImegeNumber = Number(selected[0].id.slice(-1));
    showImage(selectedImegeNumber);
  }
}

function keyboardScroll(event) {
  console.log(event);
  let pressedKey = event.key;

  if ($("#popup").hasClass("active")) {
    if (pressedKey == "ArrowRight") {
      nextImage();
    }
    if (pressedKey == "ArrowLeft") {
      previousImage();
    }
    if (pressedKey == "Escape") {
      closeImage();
    }
  } else {
    keyboardAction(event);
  }
}

function getGridData() {
  // calc computed style
  const gridComputedStyle = window.getComputedStyle(grid_container);

  return {
    // get number of grid rows
    gridRowCount: gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length,
    // get number of grid columns
    gridColumnCount: gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length,
    // get grid row sizes
    gridRowSizes: gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").map(parseFloat),
    // get grid column sizes
    gridColumnSizes: gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").map(parseFloat),
  };
}

window.addEventListener("DOMContentLoaded", outputGridData);
window.addEventListener("resize", outputGridData);

function outputGridData() {
  const gridData = getGridData();
  return {
    Rows: gridData.gridRowCount,
    Columns: gridData.gridColumnCount,
    Rows_sizes: gridData.gridRowSizes,
    Column_sizes: gridData.gridColumnSizes,
  };
}

container.addEventListener("click", selectedImage);
close.addEventListener("click", closeImage);
next.addEventListener("click", nextImage);
prev.addEventListener("click", previousImage);
overlay.addEventListener("click", closeImage);
