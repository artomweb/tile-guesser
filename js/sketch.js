let boxWidth;
let boxHeight;
let key;
let button;

let gridSize = 8;
let boxes = [];
let guesses = 0;
let found = false;
let attempts = 0;
let avg = "~";
let totalScores = 0;
let bigText = 32;
let smallText = 24;
let padding = 10;

function setup() {
  canvas = createCanvas(400, 600);
  canvas.parent("sketch");
  canvas.mouseClicked(eventMouse);

  boxWidth = (width - padding) / gridSize;
  boxHeight = (width - padding) / gridSize;

  key = createVector(floor(random(gridSize)), floor(random(gridSize)));

  for (i = 0; i < gridSize; i++) {
    for (j = 0; j < gridSize; j++) {
      let boxTemp = new Box(i, j, key);
      boxes.push(boxTemp);
    }
  }

  textFont("Arvo");
}

function reset() {
  attempts++;
  totalScores += guesses;
  avg = round(totalScores / attempts, 1);

  guesses = 0;
  found = false;

  key = createVector(floor(random(gridSize)), floor(random(gridSize)));

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].generateNewProps(key);
  }
}

function draw() {
  background(220);

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].draw();
  }

  rectMode(CENTER);
  textAlign(CENTER);

  fill(0);

  textSize(bigText);

  text("Guesses: " + guesses, 125, 475, 100, 100);
  text("Avg: " + avg, width - 100, 475, 50, 100);
  textSize(smallText);
  text("click anywhere to start/restart", width / 2, height - 5, width, 75);
}

function eventMouse() {
  if (found) {
    reset();
  } else {
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].mouseInside()) {
        if (!boxes[i].flipped) {
          boxes[i].flipped = true;
          guesses++;
        }
        if (boxes[i].distKeys == 0) {
          found = true;
        }
      }
    }
  }
}
