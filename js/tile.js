class Tile {
  constructor(i, j, thisKey, tileWidth, tileHeight) {
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.gridPos = createVector(i, j);
    this.realPos = createVector(
      padding / 2 + (this.gridPos.x * this.tileWidth + this.tileWidth / 2),
      padding / 2 + (this.gridPos.y * this.tileHeight + this.tileHeight / 2)
    );
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
      rect(this.realPos.x, this.realPos.y, this.tileWidth - 10, this.tileHeight - 10, 5);
    } else {
      fill(this.col);
      rect(this.realPos.x, this.realPos.y, this.tileWidth, this.tileHeight, 5);
    }
  }

  mouseInside() {
    return (
      mouseX >= this.realPos.x - this.tileWidth / 2 &&
      mouseX < this.realPos.x + this.tileWidth / 2 &&
      mouseY >= this.realPos.y - this.tileHeight / 2 &&
      mouseY < this.realPos.y + this.tileHeight / 2
    );
  }
}
