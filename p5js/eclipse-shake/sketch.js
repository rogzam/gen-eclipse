let canvasWidth = 1000;  // Width of the canvas
let canvasHeight = 600;  // Height of the canvas

let numCols = 17; // Number of columns
let numRows = 12; // Number of rows
let spacing = 66; // Spacing between dots
let diameter = 40; // Diameter of the dots
let rowOffset = 30; // Horizontal offset for every other row

let gridWidth = (numCols - 1) * spacing;
let gridHeight = (numRows - 1) * spacing;

let offsetX = (canvasWidth - gridWidth) / 2;
let offsetY = (canvasHeight - gridHeight) / 2;

let frequency = 0.5; // Adjust this value to extend the peaks

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(0);
  let time = millis() / 1000; // Get the current time in seconds
  
  for (let y = 0; y < numRows; y++) {
    let currentOffsetX = (y % 2 == 0) ? 0 : rowOffset;
    for (let x = 0; x < numCols; x++) {
      let posX = offsetX + x * spacing + currentOffsetX;
      let posY = offsetY + y * spacing;

      // Calculate the offset for animation
      let animatedOffset = sin((time + y) * frequency) * 20;
      let redCircleOffset = cos((time + y) * frequency) * 10; // Offset for the red circle
      
      // Draw white circle
      fill(255);
      noStroke();
      ellipse(posX + animatedOffset, posY, diameter, diameter);
      
      // Draw red circle
      fill(254, 19, 77);
      ellipse(posX + diameter / 4 + animatedOffset + redCircleOffset, posY, diameter, diameter);
    }
  }
}

