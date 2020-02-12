const config = require("./config")

class Rocket {

  constructor(x, y, id) {
    this.coords = {x: x, y: y}; // the coords of the player
    this.vel = {x: 0, y: 0};    // the velocity of the player
    this.id = id;               // the id of the client the rocket belongs to
    this.ammo = 5;              // the ammo the player has left
    this.angle = 0;             // the angle the player is pointing and thrusting in
    this.aVel = 0;              // the speed the rocket is turning at 
    this.thrusting = false;     // if the rocket is applying thrust
    this.speedBoost = 0;        // the boost in velocity given by a powerup
    this.dir = 0;
  }
  
  update(width, height) {
    if (this.thrusting) {
      // apply thrust
      this.vel.x += (config.ACC_RATE+this.speedBoost)*Math.cos(this.angle);
      this.vel.y += (config.ACC_RATE+this.speedBoost)*Math.sin(this.angle);
    } 
    
    // apply friction
    this.vel.x -= config.FRICTION * this.vel.x;
    this.vel.y -= config.FRICTION * this.vel.y;

    // move the rocket according to its velocity
    this.coords.x += this.vel.x;
    this.coords.y += this.vel.y;
   
    // turn the rocket according to its turning speed
    this.angle += this.aVel;

    // wrap the rocket around the edges of the screen
    this.wrap(width, height);    
  }

  /**
   * updates the coordinates of the rocket 
   * to make it wrap around the edges of thescreen
   */
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

  /**
   * set the speed the rocket should turn at 
   * @param {int} dir the direction of turning; -1 for left, 0 for none, 1 for right
   */
  turn(dir) {
    this.aVel = dir * config.TURN_RATE;
  }

  /**
   * set wether the rocket is applying thrust
   * @param {bool} thrusting 
   */
  thrust(thrusting) {
    this.thrusting = thrusting;
  }

  /**
   * returns true is the rocket is moving
   */
  moving() {
    return this.vel.x > 0 || this.vel.y > 0;
  }

  /* 
   * handle shooting and ammo 
   */ 
  shoot() {
    this.ammo -= 1;
  }
  reload(amt) {
    this.ammo += amt;
    this.ammo = this.ammo <= config.MAX_AMMO ? this.ammo : config.MAX_AMMO;
  }
  hasAmmo() {
    return this.ammo > 0;
  }
  
  /* 
   * handle the powerups 
   */
  boost(boosting) {
    this.speedBoost = boosting ? config.SPEEDBOOST : 0;
  }

  getCoords() {
    return {x: this.coords.x, y: this.coords.y};
  }
  getHeading() {
    return this.angle;
  }
}

module.exports = Rocket;