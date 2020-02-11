const config = require("./config")

class Bullet {

  constructor(coords, heading, ownerId) {
    this.coords = coords;
    this.heading = heading;
    this.ownerId = ownerId;
  }

  update() {
    this.coords.x += config.BULLET_VEL*Math.cos(this.heading);
    this.coords.y += config.BULLET_VEL*Math.sin(this.heading);
  }

  collidesWithEdges() {
    return (
      this.coords.x < 0 || 
      this.coords.x > config.WIDTH ||
      this.coords.y < 0 || 
      this.coords.y > config.HEIGHT
    )
  }

  getCoords() {
    return  {x: this.coords.x, y: this.coords.y};
  }
}

module.exports = Bullet;