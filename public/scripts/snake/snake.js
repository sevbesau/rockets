// TODO refactor and comment
function Snake(size) {
  this.x = 20;
  this.y = 20;
  this.xvel = 1;
  this.yvel = 0;
  this.size = size;
  this.len = 2;
  this.tail = [];
  this.scale = floor(height / 20);

  this.update = function () {
    this.tail[this.len - 1] = createVector(this.x, this.y);
    for (i = 0; i < this.len - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.x += this.xvel * this.scale;
    this.y += this.yvel * this.scale;

    if (this.x > width - 10) { this.x = 0; } else if (this.x < -10) { this.x = width; }
    if (this.y > height - 10) { this.y = 0; } else if (this.y < -10) { this.y = height; }
  };


  this.draw = function () {
    // stroke(255);
    noStroke();
    fill(color(0, 255, 0));
    for (i = 0; i < this.len; i++) {
      body = this.tail[i];
      rect(body.x, body.y, this.size, this.size);
    }
  };


  this.death = function (score) {
    const head = this.tail[this.len - 1];
    for (i = 0; i < this.len - 2; i++) {
      const body = this.tail[i];
      if (head.x == body.x && head.y == body.y) {
        this.len = 2;
        score = 0;
      }
    }
    return score;
  };

  this.dir = function (x, y) {
    this.xvel = x;
    this.yvel = y;
  };

  this.grow = function () {
    this.len += 1;
  };
}
