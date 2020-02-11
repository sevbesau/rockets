const config = require("./config")

class Rocket {

  constructor(x, y) {
    this.coords = {x: x, y: y};
    this.vel = {x: 0, y: 0};
    this.acc = 0;
    this.angle = 0;
    this.state = "neutral";
  }
  
  update(width, height) {
    this.vel.x += this.acc*Math.cos(this.angle);
    this.vel.y += this.acc*Math.sin(this.angle);

    // air resistance
    this.vel.x *= config.AIR_RESISTANCE;
    this.vel.y *= config.AIR_RESISTANCE;

    // Move
    this.coords.x += this.vel.x;
    this.coords.y += this.vel.y;

    this.wrap(width, height);    
  }

  wrap() {
    if (this.coords.x >= config.WIDTH) {
      this.coords.x = 0;
    } else if (this.coords.x <= 0) {
      this.coords.x = config.WIDTH;
    }
    if (this.coords.y >= config.HEIGHT) {
      this.coords.y = 0;
    } else if (this.coords.y <= 0) {
      this.coords.y = config.HEIGHT;
    }
  }

  collidesWithBullet(coords) {
    return dist(this.coords.x, this.coords.y, coords.x, coords.y) < 20;
  }

  turn(a) {
    this.angle += a;
  }

  accelerate(acc) {
    this.acc = acc;
  }

  moving() {
    return this.vel.x > 0 || this.vel.y > 0;
  }

  getCoords() {
    return {x: this.coords.x, y: this.coords.y};
  }

  getHeading() {
    return this.angle;
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
  
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
}

module.exports = Rocket;