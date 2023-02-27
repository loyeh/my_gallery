const grid_container = document.getElementById("grid_container");
const inputFiles = document.getElementById("inputFiles");
const inputFolder = document.getElementById("inputFolder");
const root = document.querySelector(":root");
let availableWidth = window.innerWidth;
let containerWidth = grid_container.clientWidth;
let gridColumnCount = Math.trunc(availableWidth / 350) + 1;
let flexPercent, files;
const arrayImage = [];

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
        let parent_column = parent_with_min_children(columns);
        const image = creatImage(URL.createObjectURL(imageFile));
        arrayImage[key] = image;

        parent_column.appendChild(image);
      }
    }
    // animate images show
    let i = 0;
    let clearTime = setInterval(() => {
      arrayImage[i].setAttribute("style", "display:initial");
      arrayImage[i].classList.add("animate__animated", "animate__zoomIn");
      i++;
      i == arrayImage.length ? clearInterval(clearTime) : undefined;
    }, 200);
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
    }
  }
  for (let i = 0; i < columns.length; i++) {
    if ((columns[i].clientHeight = height)) {
      return columns[i];
    }
  }
}

function creatImage(imageSrc) {
  const image = document.createElement("img");
  image.setAttribute("src", imageSrc);
  image.className = "img";
  return image;
}
window.addEventListener("resize", () => {
  gridMaker(files);
});
