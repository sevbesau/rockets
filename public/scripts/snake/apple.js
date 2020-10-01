// TODO refactor and comment
function Apple(x, y) {
  this.x = x;
  this.y = y;
  this.size = 20;
  this.scale = floor(height / this.size);

  this.draw = function () {
    fill(color(255, 0, 0));
    ellipse(this.x, this.y, 20);
  };

  this.update = function () {
    this.x = floor(random(floor(width / this.size))) * this.scale + 10;
    this.y = floor(random(floor(height / this.size))) * this.scale + 10;
  };
}
