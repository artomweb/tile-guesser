let gridSize = 8;
let boxWidth;
let boxHeight;
let keys;
let boxes = [];
let guesses = 0;
let found = false;
let button;
let attempts = 0;
let avg = "~";
let totalScores = 0;
let bigText = 32;
let smallText = 24;
let padding = 10;

function setup() {
  canvas = createCanvas(400, 600);
  canvas.parent("sketch");

  boxWidth = (width - padding) / gridSize;
  boxHeight = (width - padding) / gridSize;

  keys = createVector(floor(random(gridSize)), floor(random(gridSize)));

  for (i = 0; i < gridSize; i++) {
    for (j = 0; j < gridSize; j++) {
      let boxTemp = new box(i, j);
      boxes.push(boxTemp);
    }
  }

  // rectMode(CENTER);

  // let button = createButton("RESET");
  // button.size(100, 50);
  // button.style("border-radius", "10px");
  // button.style("font-size", "20px");
  // button.parent("sketch");
  // button.position(0, 0);
  // button.mousePressed(reset);

  // noLoop();

  textFont("Arvo");
}

function reset() {
  if (found) {
    attempts++;
    totalScores += guesses;
    avg = round(totalScores / attempts, 1);
  }

  guesses = 0;
  found = false;

  keys = createVector(floor(random(gridSize)), floor(random(gridSize)));

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].generateNewProps();
  }
}

// function manhattan(vec1, vec2){
//   return abs(vec1.x - vec2.x) + abs(vec1.y - vec2.y);
// }

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

function mousePressed() {
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
    // if (found) {
    //   for (let i = 0; i < boxes.length; i++) {
    //     boxes[i].flipped = true;
    //   }
    // }
  }
}

class box {
  constructor(i, j) {
    this.gridPos = createVector(i, j);
    this.realPos = createVector(
      padding / 2 + (this.gridPos.x * boxWidth + boxWidth / 2),
      padding / 2 + (this.gridPos.y * boxHeight + boxHeight / 2)
    );
    this.generateNewProps();
  }

  generateNewProps() {
    this.distKeys = this.manhatten();
    this.hiddenCol = this.calcCol();
    this.col = color("#FFFFF");
    this.flipped = false;
  }

  manhatten() {
    return abs(keys.x - this.gridPos.x) + abs(keys.y - this.gridPos.y);
  }

  calcCol() {
    let boxCol;
    switch (this.distKeys) {
      case 0:
        boxCol = color("#F5F749");
        break;

      case 1:
        boxCol = color("#BD0B00");
        break;

      case 2:
        boxCol = color("#DF4747");
        break;

      case 3:
        boxCol = color("#D77FC9");
        break;

      case 4:
        boxCol = color("#B7BAFF");
        break;

      default:
        boxCol = color("#C1DCFD");
    }
    return boxCol;
  }

  draw() {
    rectMode(CENTER);

    if (this.flipped) {
      fill(this.hiddenCol);
      rect(this.realPos.x, this.realPos.y, boxWidth - 10, boxHeight - 10, 5);
    } else {
      fill(this.col);
      rect(this.realPos.x, this.realPos.y, boxWidth, boxHeight, 5);
    }
  }

  mouseInside() {
    return (
      mouseX >= this.realPos.x - boxWidth / 2 &&
      mouseX < this.realPos.x + boxWidth / 2 &&
      mouseY >= this.realPos.y - boxHeight / 2 &&
      mouseY < this.realPos.y + boxHeight / 2
    );
  }
}
