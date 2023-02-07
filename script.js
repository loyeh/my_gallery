const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const container = document.getElementById("grid_container");
const background_image = document.getElementById("background_image");
const image = document.getElementById("image");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const close = document.getElementById("close_button");
let enlaged_image_number;
const grid_elements = document.getElementsByClassName("grid_element");

// generating the tumbnail grid in the document object

for (let i = 1; i < 52; i++) {
  const element = document.createElement("div");
  const image1 = document.createElement("img");
  image1.setAttribute("src", `Img/tumb/piture_${i}.jpg`);
  element.setAttribute("class", "grid_element");
  element.setAttribute("ondblclick", `showImage(${i})`);
  image1.setAttribute("id", `item${i}`);
  element.append(image1);
  container.append(element);
}

function showImage(n) {
  image.setAttribute("src", `Img/piture_${n}.jpg`);
  background_image.setAttribute("src", `Img/tumb/piture_${n}.jpg`);

  popup.classList.add("active");
  overlay.classList.add("active");
  container.classList.add("blur");
  enlaged_image_number = n;
  if (enlaged_image_number > 50) {
    next.classList.add("hidden");
  }
  if (enlaged_image_number >= 2) {
    prev.classList.remove("hidden");
  }
  if (enlaged_image_number < 2) {
    prev.classList.add("hidden");
  }
  if (enlaged_image_number <= 50) {
    next.classList.remove("hidden");
  }
  return enlaged_image_number;
}

function closeImage() {
  image.setAttribute("src", ``);
  popup.classList.remove("active");
  overlay.classList.remove("active");
  container.classList.remove("blur");
}

function nextImage() {
  enlaged_image_number++;
  showImage(enlaged_image_number);
}

function previousImage() {
  enlaged_image_number--;
  showImage(enlaged_image_number);
}
function selectedImage(event) {
  for (let i = 0; i < grid_elements.length; i++) {
    grid_elements[i].classList.remove("selected");
  }
  event.target.parentNode.classList.add("selected");
  let urlText = event.target.src.slice(21);
  background_image.setAttribute("src", urlText);
  // console.log(urlText);
}

container.addEventListener("click", selectedImage);
close.addEventListener("click", closeImage);
next.addEventListener("click", nextImage);
prev.addEventListener("click", previousImage);
overlay.addEventListener("click", closeImage);
