let canvasWidth = 1000;  // Width of the canvas
let canvasHeight = 650;  // Increased canvas height to accommodate sliders

let numCols = 22; // Starting number of columns
let numRows = 9; // Starting number of rows
let spacing = 58; // Spacing between dots
let whiteDiameter = 36; // Diameter of the white dots
let redDiameter = 36; // Diameter of the red dots
let rowOffset = 18; // Horizontal offset for every other row

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(0);
  noLoop();  // Stop draw() from looping
  drawComposition(); // Draw the static composition
  createSliders(); // Add the sliders
}

function draw() {
  // The draw function is not needed for continuous rendering
}

function drawComposition() {
  background(0); // Clear the background for each redraw
  
  let gridWidth = (numCols - 1) * spacing;
  let gridHeight = (numRows - 1) * spacing;
  
  let offsetX = (canvasWidth - gridWidth) / 2;
  let offsetY = (canvasHeight - gridHeight) / 2;

  for (let y = 0; y < numRows; y++) {
    let currentOffsetX = (y % 2 == 0) ? 0 : rowOffset;
    for (let x = 0; x < numCols; x++) {
      let posX = offsetX + x * spacing + currentOffsetX;
      let posY = offsetY + y * spacing;

      // Draw white circle
      fill(255);
      noStroke();
      ellipse(posX, posY, whiteDiameter, whiteDiameter);
      
      // Draw red circle
      fill(254, 19, 77);
      ellipse(posX + whiteDiameter / 4, posY, redDiameter, redDiameter);
    }
  }
}

function createSliders() {
  let sliWidth = '80px'; // Reduced width
  let sliHeight = '2px';  // Slimmer height
  let sliThumbSize = '2px'; // Slimmer thumb
  let sliderSpacing = canvasWidth / 8; // Calculate spacing for sliders
  let sliderYPosition = canvasHeight - 0; // Y position of the sliders

  function setSliderStyle(slider) {
    let sliderId = 'slider' + Math.random().toString(36).substr(2, 9);
    slider.elt.setAttribute('id', sliderId);

    let style = document.createElement('style');
    style.innerHTML = `
      #${sliderId} {
        -webkit-appearance: none;
        height: 0px;
        background-color: transparent;
      }
      #${sliderId}::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        width: ${sliThumbSize};
        height: 12px;
        background: #ffffff;
        cursor: pointer;
        margin-top: -6px;
      }
      #${sliderId}::-webkit-slider-runnable-track {
        width: 100%;
        height: ${sliHeight};
        cursor: pointer;
        background: #ffffff;
      }
    `;
    document.head.appendChild(style);
  }

  // Center the sliders as a group
  let groupWidth = 6 * sliderSpacing; // Total width of all sliders
  let startX = (canvasWidth - groupWidth) / 2; // Starting x position to center the group

  // Slider for number of columns
  let sliderNumCols = createSlider(10, 34, numCols);
  sliderNumCols.position(startX + 0 * sliderSpacing, sliderYPosition);
  sliderNumCols.style('width', sliWidth);
  setSliderStyle(sliderNumCols);
  sliderNumCols.input(() => {
    numCols = sliderNumCols.value();
    drawComposition();
  });

  // Slider for number of rows
  let sliderNumRows = createSlider(6, 12, numRows);
  sliderNumRows.position(startX + 1 * sliderSpacing, sliderYPosition);
  sliderNumRows.style('width', sliWidth);
  setSliderStyle(sliderNumRows);
  sliderNumRows.input(() => {
    numRows = sliderNumRows.value();
    drawComposition();
  });

  // Slider for size of white circles
  let sliderWhiteDiameter = createSlider(20, 52, whiteDiameter);
  sliderWhiteDiameter.position(startX + 2 * sliderSpacing, sliderYPosition);
  sliderWhiteDiameter.style('width', sliWidth);
  setSliderStyle(sliderWhiteDiameter);
  sliderWhiteDiameter.input(() => {
    whiteDiameter = sliderWhiteDiameter.value();
    drawComposition();
  });

  // Slider for size of red circles
  let sliderRedDiameter = createSlider(20, 52, redDiameter);
  sliderRedDiameter.position(startX + 3 * sliderSpacing, sliderYPosition);
  sliderRedDiameter.style('width', sliWidth);
  setSliderStyle(sliderRedDiameter);
  sliderRedDiameter.input(() => {
    redDiameter = sliderRedDiameter.value();
    drawComposition();
  });

  // Slider for spacing between dots
  let sliderSpacingDots = createSlider(40, 76, spacing);
  sliderSpacingDots.position(startX + 4 * sliderSpacing, sliderYPosition);
  sliderSpacingDots.style('width', sliWidth);
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
  sliderRowOffset.style('width', sliWidth);
  setSliderStyle(sliderRowOffset);
  sliderRowOffset.input(() => {
    rowOffset = sliderRowOffset.value();
    drawComposition();
  });
}

