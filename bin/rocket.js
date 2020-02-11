const config = require("./config")

class Rocket {

  constructor(x, y) {
    this.coords = {x: x, y: y};
    this.vel = {x: 0, y: 0};
    this.angle = 0;
    this.turnDir = 0;
    this.aVel = 0;
    this.thrusting = false;
  }
  
  update(width, height) {
    if (this.thrusting) {
      // apply thrust
      this.vel.x += config.ACC_RATE*Math.cos(this.angle);
      this.vel.y += config.ACC_RATE*Math.sin(this.angle);
    } else {
      // apply friction
      
    }
    this.vel.x -= config.FRICTION * this.vel.x;
    this.vel.y -= config.FRICTION * this.vel.y;

    // Move
    this.coords.x += this.vel.x;
    this.coords.y += this.vel.y;
   
    this.angle += this.aVel;

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

  turn(dir) {
    this.aVel = dir * config.TURN_RATE;
  }

  thrust(thrusting) {
    this.thrusting = thrusting;
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

  getState() {
    return this.state;
  }
  
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
}

module.exports = Rocket;