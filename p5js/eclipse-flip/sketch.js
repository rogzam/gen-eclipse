let canvasWidth = 1000;  // Width of the canvas
let canvasHeight = 100;  // Height of the canvas

let diameter = 40; // Diameter of the dots
let initialOffset = 10; // Initial distance between the circles
let animationDistance = 10; // Distance to move the circles
let animationDuration = 1; // Duration of the animation cycle in seconds
let pauseMiddle = 0.1; // Duration of the pause at the middle in seconds
let pauseEnd = 1; // Duration of the pause between loops in seconds
let animationProgress = 0; // Progress of the animation from 0 to 1
let reverseOrder = false; // Variable to control the order of the circles
let firstCycleCompleted = false; // Track the first cycle completion

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(0);
  let posX = canvasWidth / 2;
  let posY = canvasHeight / 2;

  // Calculate positions for the animation
  let animatedRedPosX = posX + initialOffset;
  let animatedWhitePosX = posX - initialOffset;

  // Total duration of one complete cycle including pauses
  let totalCycleDuration = animationDuration * 2 + pauseMiddle + pauseEnd;

  // Determine the current phase based on animationProgress
  if (animationProgress < animationDuration) {
    // First half of the animation (moving to extreme positions)
    let progress = ease(animationProgress / animationDuration);
    animatedRedPosX = lerp(posX + initialOffset, posX + initialOffset + animationDistance, progress);
    animatedWhitePosX = lerp(posX - initialOffset, posX - initialOffset - animationDistance, progress);
  } else if (animationProgress < animationDuration + pauseMiddle) {
    // Pause at the middle
    animatedRedPosX = posX + initialOffset + animationDistance;
    animatedWhitePosX = posX - initialOffset - animationDistance;
    if (!firstCycleCompleted) {
      reverseOrder = !reverseOrder; // Flip the order at the end of the first half of the animation
      firstCycleCompleted = true;
    }
  } else if (animationProgress < animationDuration * 2 + pauseMiddle) {
    // Second half of the animation (moving back to starting positions)
    let progress = ease((animationProgress - animationDuration - pauseMiddle) / animationDuration);
    animatedRedPosX = lerp(posX + initialOffset + animationDistance, posX + initialOffset, progress);
    animatedWhitePosX = lerp(posX - initialOffset - animationDistance, posX - initialOffset, progress);
  } else {
    // Pause at the end
    animatedRedPosX = posX + initialOffset;
    animatedWhitePosX = posX - initialOffset;
    firstCycleCompleted = false; // Reset for the next cycle
  }

  // Draw circles with the option to reverse the order
  if (reverseOrder) {
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

  // Update the animation progress
  animationProgress += deltaTime / 1000;

  // Reset the animation progress for the next cycle
  if (animationProgress >= totalCycleDuration) {
    animationProgress = 0;
  }
}

// Ease function for smooth animation (ease-in-out)
function ease(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

