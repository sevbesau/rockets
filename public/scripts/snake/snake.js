class Snake {
  constructor() {
    this.coords = createVector(5, 5);
    this.vel = createVector(1, 0);
    this.len = 2;
    this.tail = [];
  }

  update() {
    this.tail[this.len - 1] = createVector(this.coords.x, this.coords.y);
    for (let i = 0; i < this.len - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.coords.x += this.vel.x;
    this.coords.y += this.vel.y;
    this.blocked = false;

    if (this.coords.x > SECTIONS-1) { this.coords.x = 0; } else if (this.coords.x < 0) { this.coords.x = SECTIONS-1; }
    if (this.coords.y > SECTIONS-1) { this.coords.y = 0; } else if (this.coords.y < 0) { this.coords.y = SECTIONS-1; }
  }

  draw() {
    fill(color(0, 255, 0));
    stroke(color(0, 255, 0));
    this.tail.forEach((bodyPart) => {
      rect(bodyPart.x*scale, bodyPart.y*scale, scale, scale);
    });
  }

  isEatingItself() {
    const head = this.tail[this.len - 1];
    for (let i = 0; i < this.len - 2; i++) {
      if (head.equals(this.tail[i])) {
        return true;
      }
    }
    return false;
  };
  
  die() {
    this.tail = [];
    this.len = 2;
  }

  dir(x, y) {
    if (!this.blocked) {
      this.vel.x = x;
      this.vel.y = y;
      this.blocked = true;
    }
  }

  grow() {
    this.len += 1;
  }
}
