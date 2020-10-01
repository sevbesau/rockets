// TODO refactor and comment
class Apple {
  constructor(coords) {
    this.coords = coords;
    this.size = 20;
  }

  draw() {
    noStroke();
    fill(color(255, 0, 0));
    ellipseMode(CORNER);
    ellipse(this.coords.x*scale, this.coords.y*scale, scale);
  }

  update(coords) {
    this.coords = coords;
  }
}
