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

let initialOffset = 7; // Initial distance between the circles
let animationDistance = 13; // Distance to move the circles
let animationDuration = 1; // Duration of the animation cycle in seconds
let pauseMiddle = .1; // Duration of the pause at the middle in seconds
let pauseEnd = 5; // Duration of the pause between loops in seconds

let animationStates = []; // Array to store animation states for each pair

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // Initialize animation states for each pair in the grid
  for (let y = 0; y < numRows; y++) {
    animationStates[y] = [];
    for (let x = 0; x < numCols; x++) {
      animationStates[y][x] = {
        animationProgress: 0,
        reverseOrder: false,
        firstCycleCompleted: false,
        isAnimating: false
      };
    }
  }
}

function draw() {
  background(0);

  for (let y = 0; y < numRows; y++) {
    let currentOffsetX = (y % 2 == 0) ? 0 : rowOffset;
    for (let x = 0; x < numCols; x++) {
      let posX = offsetX + x * spacing + currentOffsetX;
      let posY = offsetY + y * spacing;

      let state = animationStates[y][x];
      let animatedRedPosX = posX + initialOffset;
      let animatedWhitePosX = posX - initialOffset;

      // Total duration of one complete cycle including pauses
      let totalCycleDuration = animationDuration * 2 + pauseMiddle + pauseEnd;

      if (state.isAnimating) {
        // Determine the current phase based on animationProgress
        if (state.animationProgress < animationDuration) {
          // First half of the animation (moving to extreme positions)
          let progress = ease(state.animationProgress / animationDuration);
          animatedRedPosX = lerp(posX + initialOffset, posX + initialOffset + animationDistance, progress);
          animatedWhitePosX = lerp(posX - initialOffset, posX - initialOffset - animationDistance, progress);
        } else if (state.animationProgress < animationDuration + pauseMiddle) {
          // Pause at the middle
          animatedRedPosX = posX + initialOffset + animationDistance;
          animatedWhitePosX = posX - initialOffset - animationDistance;
          if (!state.firstCycleCompleted) {
            state.reverseOrder = !state.reverseOrder; // Flip the order at the end of the first half of the animation
            state.firstCycleCompleted = true;
          }
        } else if (state.animationProgress < animationDuration * 2 + pauseMiddle) {
          // Second half of the animation (moving back to starting positions)
          let progress = ease((state.animationProgress - animationDuration - pauseMiddle) / animationDuration);
          animatedRedPosX = lerp(posX + initialOffset + animationDistance, posX + initialOffset, progress);
          animatedWhitePosX = lerp(posX - initialOffset - animationDistance, posX - initialOffset, progress);
        } else {
          // Pause at the end
          animatedRedPosX = posX + initialOffset;
          animatedWhitePosX = posX - initialOffset;
          state.firstCycleCompleted = false; // Reset for the next cycle
        }

        // Update the animation progress
        state.animationProgress += deltaTime / 1000;

        // Reset the animation progress for the next cycle
        if (state.animationProgress >= totalCycleDuration) {
          state.animationProgress = 0;
        }
      }

      // Draw circles with the option to reverse the order
      if (state.reverseOrder) {
        // Draw red circle on bottom
        fill(254, 19, 77);
        ellipse(animatedRedPosX, posY, diameter, diameter);

        // Draw white circle on top
        fill(255);
        noStroke();
        ellipse(animatedWhitePosX, posY, diameter, diameter);
      } else {
        // Draw white circle on bottom
        fill(255);
        noStroke();
        ellipse(animatedWhitePosX, posY, diameter, diameter);

        // Draw red circle on top
        fill(254, 19, 77);
        ellipse(animatedRedPosX, posY, diameter, diameter);
      }
    }
  }
}

// Function to start the animation for a specific pair
function startAnimation(row, col) {
  if (row < numRows && col < numCols) {
    animationStates[row][col].isAnimating = true;
  }
}

// Ease function for smooth animation (ease-in-out)
function ease(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Example: Start animation for a specific pair
function mousePressed() {
  let col = Math.floor((mouseX - offsetX) / spacing);
  let row = Math.floor((mouseY - offsetY) / spacing);

  if (col >= 0 && col < numCols && row >= 0 && row < numRows) {
    startAnimation(row, col);
  }
}

