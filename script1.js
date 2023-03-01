const grid_container = document.getElementById("grid_container");
const inputFiles = document.getElementById("inputFiles");
const inputFolder = document.getElementById("inputFolder");
const root = document.querySelector(":root");
let availableWidth = window.innerWidth;
let containerWidth = grid_container.clientWidth;
let gridColumnCount = Math.trunc(availableWidth / 350) + 1;
let flexPercent, files;
const arrayImage = [];
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const close = document.getElementById("close_button");
let enlarged_image_number;
const selected = document.getElementsByClassName("selected");
let src_text = "";
const enlarged_image = document.getElementById("enlarged_image");
function grid_parameter_calculator() {
  availableWidth = window.innerWidth;

  gridColumnCount = Math.trunc(availableWidth / 350) + 1;
  flexPercent = 100 / gridColumnCount + "%";
  root.style.setProperty("--grid_column", gridColumnCount);
  root.style.setProperty("--flex_percent", flexPercent);
  return gridColumnCount;
}

function columnMaker(columnNumber) {
  const columnArray = [];
  for (let i = 0; i < columnNumber; i++) {
    const column = document.createElement("div");
    column.id = `column${i}`;
    column.classList.add("grid_column");
    columnArray[i] = column;
  }
  return columnArray;
}

inputFiles.onchange = () => {
  files = inputFiles.files;
  gridMaker(files);
  return files;
};

inputFolder.onchange = () => {
  files = inputFolder.files;

  gridMaker(files);
  return files;
};

function gridMaker(files) {
  grid_container.innerHTML = "";
  let gridColumnCount = grid_parameter_calculator();
  let columnArray = columnMaker(gridColumnCount);
  columnArray.forEach((column) => {
    grid_container.appendChild(column);
  });

  const columns = document.querySelectorAll(".grid_column");
  for (const key in files) {
    if (files.hasOwnProperty(key)) {
      const imageFile = files[key];
      if (imageFile.type.slice(0, 5) == "image") {
        let parent_column = parent_with_min_height(columns);
        const image = creatImage(URL.createObjectURL(imageFile));
        arrayImage[key] = image.firstChild;

        image.classList.add("animate__animated", "animate__zoomIn");
        parent_column.appendChild(image);
      }
    }
    // animate images show
    // let i = 0;
    // let clearTime = setInterval(() => {
    //   arrayImage[i].setAttribute("style", "display:initial");
    //   arrayImage[i].
    //   i++;
    //   i == arrayImage.length ? clearInterval(clearTime) : undefined;
    // }, 200);
  }
}

function parent_with_min_children(parentNodes) {
  const array = [];
  parentNodes.forEach((element, i) => {
    array[i] = element.children.length;
  });
  let min = Math.min.apply(null, array);
  for (let i = 0; i < parentNodes.length; i++) {
    if (parentNodes[i].children.length == min) {
      return parentNodes[i];
    }
  }
}

function parent_with_min_height(columns) {
  let height = Infinity;
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].clientHeight < height) {
      height = columns[i].clientHeight;
      console.log(height, i);
    }
  }
  console.log(height);
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].clientHeight == height) {
      return columns[i];
    }
  }
}

function creatImage(imageSrc) {
  const div = document.createElement("div");
  div.className = "grid_element";
  const image = document.createElement("img");
  image.setAttribute("src", imageSrc);
  image.className = "img";
  div.appendChild(image);
  return div;
}
window.addEventListener("resize", () => {
  const nCol = grid_parameter_calculator();
  if (nCol != gridColumnCount) {
    gridMaker(files);
  }
});

function showImage(src) {
  enlarged_image.src = src;
  popup.classList.add("active");
  overlay.classList.add("active");
  grid_container.classList.add("blur");
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
  enlarged_image.src = "";
  popup.classList.remove("active");
  overlay.classList.remove("active");
  grid_container.classList.remove("blur");
}

function nextImage() {
  enlarged_image_number++;
  if (enlarged_image_number > files.length) {
    enlarged_image_number = files.length;
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
}
const grid_elements = document.getElementsByClassName("grid_element");

function selectedImage(event) {
  for (let i = 0; i < grid_elements.length; i++) {
    grid_elements[i].classList.remove("selected");
  }
  event.target.parentNode.classList.add("selected");
  document.body.classList.remove("selected");
  src_text = event.target.src;
  return src_text;
}

function nextImageSelection() {
  selected[0].nextElementSibling.classList.add("selected");
  selected[0].classList.remove("selected");
}

function previouseImageSelection(imageNumber) {
  const selectedImage = document.getElementById(`item${imageNumber}`);
  selectedImage.classList.remove("selected");
  selectedImage.previousElementSibling.classList.add("selected");
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
  const src_text = event.target.src;
  showImage(src_text);
}

// inputFile.addEventListener = inputFileAction(inputFile, container);

document.body.addEventListener("dblclick", largeImageShow);
grid_container.addEventListener("click", selectedImage);
close.addEventListener("click", closeImage);
next.addEventListener("click", nextImage);
prev.addEventListener("click", previousImage);
overlay.addEventListener("click", closeImage);
