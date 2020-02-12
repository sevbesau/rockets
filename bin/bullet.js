const config = require("./config")

/**
 * represents a bullet in the game
 */
class Bullet {

  constructor(coords, heading, ownerId) {
    this.coords = coords;   // the coordinates of the bullet
    this.heading = heading; // the direction the bullet is going in 
    this.ownerId = ownerId; // the id of the player that shot the bullet
  }

  /**
   * moves the rocket based on bullet velocity and heading
   */
  update() {
    this.coords.x += config.BULLET_VEL*Math.cos(this.heading);
    this.coords.y += config.BULLET_VEL*Math.sin(this.heading);
  }

  // TODO move to collisions
  // checks if the rocket collides with the edges
  collidesWithEdges() {
    return (
      this.coords.x < 0 || 
      this.coords.x > config.WIDTH ||
      this.coords.y < 0 || 
      this.coords.y > config.HEIGHT
    )
  }
}

module.exports = Bullet;