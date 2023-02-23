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
const selected = document.getElementsByClassName("selected");
const grid_elements = document.getElementsByClassName("grid_element");
const inputFile = document.getElementById("input_file");
const files = inputFile.files;
const filesArray = [...files];

// generating the tumbnail grid in the document object
function emptyContainer(container) {
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
}
function gridMaker() {
  const inputFile = document.getElementById("input_file");
  const files = inputFile.files;
  const filesArray = [...files];
  for (let i = 0; i < filesArray.length; i++) {
    const element = document.createElement("div");
    const image1 = document.createElement("img");
    const file = filesArray[i];
    image1.src = URL.createObjectURL(file);
    image1.classList.add("grid_image");
    element.setAttribute("class", "grid_element");
    element.addEventListener("dblclick", largeImageShow);
    element.id = `item${i}`;
    element.append(image1);
    container.append(element);
  }
}

function inputFileAction() {
  emptyContainer(container);
  gridMaker(files);
}
const gridImage = document.getElementsByClassName("grid_image");

function showImage(i) {
  image.src = URL.createObjectURL(filesArray[i]);
  background_image.src = URL.createObjectURL(filesArray[i]);
  popup.classList.add("active");
  overlay.classList.add("active");
  container.classList.add("blur");
  if (enlarged_image_number >= files.length) {
    next.classList.add("hidden");
  }
  if (enlarged_image_number >= 2) {
    prev.classList.remove("hidden");
  }
  if (enlarged_image_number < 2) {
    prev.classList.add("hidden");
  }
  if (enlarged_image_number < files.length) {
    next.classList.remove("hidden");
  }
}

function closeImage() {
  background_image.src = "";
  image.src = "";
  popup.classList.remove("active");
  overlay.classList.remove("active");
  container.classList.remove("blur");
}

function nextImage() {
  enlarged_image_number++;
  if (enlarged_image_number > inputFile.files.length) {
    enlarged_image_number = inputFile.files.length;
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
function unSelectImage() {
  selected[0].classList.remove("selected");

  background_image.src = "";
}

function selectedImage(event) {
  for (let i = 0; i < grid_elements.length; i++) {
    grid_elements[i].classList.remove("selected");
  }
  event.target.parentNode.classList.add("selected");
  let number = event.target.parentNode.id.slice(4);
  background_image.src = URL.createObjectURL(filesArray[number]);
  console.log(event.target.parentElement);
}

function nextImageSelection() {
  selected[0].nextElementSibling.classList.add("selected");
  selected[0].classList.remove("selected");
  let number = selected[0].id.slice(4);
  background_image.src = URL.createObjectURL(filesArray[number]);
}

function previouseImageSelection(imageNumber) {
  const selectedImage = document.getElementById(`item${imageNumber}`);
  selectedImage.classList.remove("selected");
  selectedImage.previousElementSibling.classList.add("selected");
  let number = selected[0].id.slice(4);
  background_image.src = URL.createObjectURL(filesArray[number]);
}

function mouseAction(event) {
  let selectedImegeNumber = 1;
  if (selected.length > 0) {
    selectedImegeNumber = Number(selected[0].id.slice(4));
  }
  let direction = event.deltaY;
  if (direction > 0) {
    nextImageSelection();
  } else {
    previouseImageSelection(selectedImegeNumber);
  }
  console.log(event);
}

function mouseScroll(event) {
  let selectedImegeNumber = 1;
  if (selected.length > 0) {
    selectedImegeNumber = Number(selected[0].id.slice(4));
  }
  let direction = event.deltaY;
  if ($("#popup").hasClass("active")) {
    if (direction < 0) previousImage(selectedImegeNumber);
    else nextImage();
  } else {
    mouseAction(event);
  }
}

function keyboardAction(event) {
  let selectedImegeNumber = 1;
  if (selected.length > 0) {
    selectedImegeNumber = Number(selected[0].id.slice(4));
  }
  let pressedKey = event.key;
  console.log(event);
  console.log(selected);

  if (pressedKey == "ArrowRight") {
    nextImageSelection();
  }
  if (pressedKey == "ArrowLeft") {
    previouseImageSelection(selectedImegeNumber);
  }
  if (pressedKey == "Enter") {
    showImage(selectedImegeNumber);
    image.id = `image${selectedImegeNumber}`;
    enlarged_image_number = selectedImegeNumber;
    console.log(selectedImegeNumber);
  }
  if (pressedKey == "Escape") {
    unSelectImage();
  }
}

function keyboardScroll(event) {
  let selectedImegeNumber = 1;
  if (selected.length > 0) {
    selectedImegeNumber = Number(selected[0].id.slice(4));
  }
  console.log(event);
  let pressedKey = event.key;

  if ($("#popup").hasClass("active")) {
    if (pressedKey == "ArrowRight") {
      nextImage();
    }
    if (pressedKey == "ArrowLeft") {
      previousImage(selectedImegeNumber);
    }
    if (pressedKey == "Escape") {
      closeImage();
    }
  } else {
    keyboardAction(event);
  }
}
function largeImageShow(event) {
  const imageNumber = event.target.parentElement.id.slice(4);
  showImage(imageNumber);
  enlarged_image_number = imageNumber;
}

// inputFile.addEventListener = inputFileAction(inputFile, container);

document.body.addEventListener("dblclick", largeImageShow);
container.addEventListener("click", selectedImage);
close.addEventListener("click", closeImage);
next.addEventListener("click", nextImage);
prev.addEventListener("click", previousImage);
overlay.addEventListener("click", closeImage);
background_image.addEventListener("click", unSelectImage);
