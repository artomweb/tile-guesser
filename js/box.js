class Box {
  constructor(i, j, thisKey) {
    this.gridPos = createVector(i, j);
    this.realPos = createVector(padding / 2 + (this.gridPos.x * boxWidth + boxWidth / 2), padding / 2 + (this.gridPos.y * boxHeight + boxHeight / 2));
    this.generateNewProps(thisKey);
  }

  generateNewProps(thisKey) {
    this.distKeys = this.manhatten(thisKey);
    this.hiddenCol = this.calcCol();
    this.col = color("#FFFFF");
    this.flipped = false;
  }

  manhatten(thisKey) {
    return abs(thisKey.x - this.gridPos.x) + abs(thisKey.y - this.gridPos.y);
  }

  calcCol() {
    let colours = ["#F5F749", "#BD0B00", "#DF4747", "#D77FC9", "#B7BAFF", "#C1DCFD"];
    let thisDist = constrain(this.distKeys, 0, colours.length - 1);
    return colours[thisDist];
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
    return mouseX >= this.realPos.x - boxWidth / 2 && mouseX < this.realPos.x + boxWidth / 2 && mouseY >= this.realPos.y - boxHeight / 2 && mouseY < this.realPos.y + boxHeight / 2;
  }
}
