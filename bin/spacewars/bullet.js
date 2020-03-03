const config = require('./config');

/**
 * represents a bullet in the game
 */
class Bullet {
  constructor(coords, heading, ownerId) {
    this.coords = coords; // the coordinates of the bullet
    this.heading = heading; // the direction the bullet is going in
    this.ownerId = ownerId; // the id of the player that shot the bullet
  }

  /**
   * moves the rocket based on bullet velocity and heading
   */
  update() {
    this.coords.x += config.BULLET_VEL * Math.cos(this.heading);
    this.coords.y += config.BULLET_VEL * Math.sin(this.heading);
  }
}

module.exports = Bullet;
