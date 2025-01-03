let canvasWidth = 1000 * 1.7; // Width of the canvas
let canvasHeight = 650 * 1.7; // Increased canvas height to accommodate sliders

let numCols = 32; // Starting number of columns
let numRows = 14; // Starting number of rows
let spacing = 58; // Spacing between dots

let rowSpacing = 58;
let colSpacing = 58;

let whiteDiameter = 36; // Diameter of the white dots
let redDiameter = 36; // Diameter of the red dots
let rowOffset = 18; // Horizontal offset for every other row

let whiteColor = [255, 255, 255]; // Default white circle color
let redColor = [254, 19, 77]; // Default red circle color

let sliWidth = "100px"; // Reduced width
let sliderSpacing = canvasWidth / 11.4; // Calculate spacing for sliders
let sliderYPosition = canvasHeight - 35; // Y position of the sliders
let groupWidth = 6 * sliderSpacing; // Total width of all sliders
let startX = (canvasWidth - groupWidth) / 7; // Starting x position to center the group
let circleOffset = whiteDiameter / 4; // Default offset

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(0);
  noLoop(); // Stop draw() from looping
  drawComposition(); // Draw the static composition
  createSliders(); // Add the sliders
  createColorPickersAndExport(); // Add color pickers and export button
}

function draw() {
  // The draw function is not needed for continuous rendering
  fill("rgb(255,255,255)");
  text(numCols, startX + 0 * sliderSpacing + 45, sliderYPosition + 20);
  text(numRows, startX + 1 * sliderSpacing + 45, sliderYPosition + 20);
  text(whiteDiameter, startX + 2 * sliderSpacing + 45, sliderYPosition + 20);
  text(redDiameter, startX + 3 * sliderSpacing + 45, sliderYPosition + 20);
  text(spacing, startX + 4 * sliderSpacing + 45, sliderYPosition + 20);
  text(rowOffset, startX + 5 * sliderSpacing + 45, sliderYPosition + 20);
  text(circleOffset, startX + 6 * sliderSpacing + 45, sliderYPosition + 20);
  text(rowSpacing, startX + 7 * sliderSpacing + 45, sliderYPosition + 20);
  text(colSpacing, startX + 8 * sliderSpacing + 45, sliderYPosition + 20);


  
}

function drawComposition() {
  clear(0); // Clear the background for each redraw

  fill("rgb(255,255,255)");
  text(numCols, startX + 0 * sliderSpacing + 45, sliderYPosition + 20);
  text(numRows, startX + 1 * sliderSpacing + 45, sliderYPosition + 20);
  text(whiteDiameter, startX + 2 * sliderSpacing + 45, sliderYPosition + 20);
  text(redDiameter, startX + 3 * sliderSpacing + 45, sliderYPosition + 20);
  text(spacing, startX + 4 * sliderSpacing + 45, sliderYPosition + 20);
  text(rowOffset, startX + 5 * sliderSpacing + 45, sliderYPosition + 20);
  text(circleOffset, startX + 6 * sliderSpacing + 45, sliderYPosition + 20);
  text(rowSpacing, startX + 7 * sliderSpacing + 45, sliderYPosition + 20);
  text(colSpacing, startX + 8 * sliderSpacing + 45, sliderYPosition + 20);

  let gridWidth = (numCols - 1) * spacing;
  let gridHeight = (numRows - 1) * spacing;

  let offsetX = (canvasWidth - gridWidth) / 2;
  let offsetY = (canvasHeight - gridHeight) / 2;

  for (let y = 0; y < numRows; y++) {
    let currentOffsetX = y % 2 == 0 ? 0 : rowOffset;
    for (let x = 0; x < numCols; x++) {
      posX = offsetX + x * colSpacing + currentOffsetX;
      posY = offsetY + y * rowSpacing;

      // Draw white circle
      fill(whiteColor);
      noStroke();
      ellipse(posX, posY, whiteDiameter, whiteDiameter);

      // Draw red circle
      fill(redColor);
      ellipse(posX + circleOffset, posY, redDiameter, redDiameter);
    }
  }
}

function createSliders() {
  function setSliderStyle(slider) {
    let sliderId = "slider" + Math.random().toString(36).substr(2, 9);
    slider.elt.setAttribute("id", sliderId);

    let style = document.createElement("style");
    style.innerHTML = `
      #${sliderId} {
        -webkit-appearance: none;
        height: 0px;
        background-color: transparent;
      }
      #${sliderId}::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        width: 2px;
        height: 12px;
        background: #ffffff;
        cursor: pointer;
        margin-top: -6px;
      }
      #${sliderId}::-webkit-slider-runnable-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: #ffffff;
      }
    `;
    document.head.appendChild(style);
  }

  // Slider for number of columns
  let sliderNumCols = createSlider(1, 80, numCols);
  sliderNumCols.position(startX + 0 * sliderSpacing, sliderYPosition);
  sliderNumCols.style("width", sliWidth);
  setSliderStyle(sliderNumCols);
  sliderNumCols.input(() => {
    numCols = sliderNumCols.value();
    drawComposition();
  });

  // Slider for number of rows
  let sliderNumRows = createSlider(1, 50, numRows);
  sliderNumRows.position(startX + 1 * sliderSpacing, sliderYPosition);
  sliderNumRows.style("width", sliWidth);
  setSliderStyle(sliderNumRows);
  sliderNumRows.input(() => {
    numRows = sliderNumRows.value();
    drawComposition();
  });

  // Slider for size of white circles
  let sliderWhiteDiameter = createSlider(20, 400, whiteDiameter);
  sliderWhiteDiameter.position(startX + 2 * sliderSpacing, sliderYPosition);
  sliderWhiteDiameter.style("width", sliWidth);
  setSliderStyle(sliderWhiteDiameter);
  sliderWhiteDiameter.input(() => {
    whiteDiameter = sliderWhiteDiameter.value();
    drawComposition();
  });

  // Slider for size of red circles
  let sliderRedDiameter = createSlider(20, 400, redDiameter);
  sliderRedDiameter.position(startX + 3 * sliderSpacing, sliderYPosition);
  sliderRedDiameter.style("width", sliWidth);
  setSliderStyle(sliderRedDiameter);
  sliderRedDiameter.input(() => {
    redDiameter = sliderRedDiameter.value();
    drawComposition();
  });

  // Slider for spacing between dots
  let sliderSpacingDots = createSlider(40, 220, spacing);
  sliderSpacingDots.position(startX + 4 * sliderSpacing, sliderYPosition);
  sliderSpacingDots.style("width", sliWidth);
  setSliderStyle(sliderSpacingDots);
  sliderSpacingDots.input(() => {
    spacing = sliderSpacingDots.value();
    drawComposition();
  });

  // Adjust the row offset slider to have a wider range
  let maxOffset = whiteDiameter * 2 + spacing;

  // Slider for row offset
  let sliderRowOffset = createSlider(-maxOffset, maxOffset, rowOffset);
  sliderRowOffset.position(startX + 5 * sliderSpacing, sliderYPosition);
  sliderRowOffset.style("width", sliWidth);
  setSliderStyle(sliderRowOffset);
  sliderRowOffset.input(() => {
    rowOffset = sliderRowOffset.value();
    drawComposition();
  });

  // Slider for row offset
  let sliderCircleOffset = createSlider(0, 150, circleOffset);
  sliderCircleOffset.position(startX + 6 * sliderSpacing, sliderYPosition);
  sliderCircleOffset.style("width", sliWidth);
  setSliderStyle(sliderCircleOffset);
  sliderCircleOffset.input(() => {
    circleOffset = sliderCircleOffset.value();
    drawComposition();
  });

  let sliderRowSpacing = createSlider(40, 150, rowSpacing);
  sliderRowSpacing.position(startX + 7 * sliderSpacing, sliderYPosition);
  sliderRowSpacing.style("width", sliWidth);
  setSliderStyle(sliderRowSpacing);
  sliderRowSpacing.input(() => {
    rowSpacing = sliderRowSpacing.value();
    drawComposition();
  });

  let sliderColSpacing = createSlider(40, 150, colSpacing);
  sliderColSpacing.position(startX + 8 * sliderSpacing, sliderYPosition);
  sliderColSpacing.style("width", sliWidth);
  setSliderStyle(sliderColSpacing);
  sliderColSpacing.input(() => {
    colSpacing = sliderColSpacing.value();
    drawComposition();
  });
}

function createColorPickersAndExport() {
  let pickerYPosition = canvasHeight - 48;

  // White circle color picker
  whitePicker = createColorPicker("#FFFFFF");
  whitePicker.position(canvasWidth - 220, pickerYPosition);
  whitePicker.input(() => {
    whiteColor = whitePicker.color().levels.slice(0, 3); // Update white color
    drawComposition();
  });

  // Red circle color picker
  let redPicker = createColorPicker("#FE134D");
  redPicker.position(canvasWidth - 155, pickerYPosition);
  redPicker.input(() => {
    redColor = redPicker.color().levels.slice(0, 3); // Update red color
    drawComposition();
  });

  // Export button
  let exportButton = createButton("PNG");
  exportButton.position(canvasWidth - 90, pickerYPosition);
  exportButton.style("width", "50px");
  exportButton.style("height", "26px");
  exportButton.style("background-color", "#000000");
  exportButton.style("color", "#ffffff");
  exportButton.style("border", "2px solid #ffffff");
  exportButton.mousePressed(() => {
    saveCanvas("coexist", "png"); // Save the canvas as PNG
  });
}
