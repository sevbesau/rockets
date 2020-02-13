const config = require("./config");
const util = require("./util");

/**
 * Basic powerup sctructure
 */
class PowerUp {
  constructor(x, y, lifeSpan) {
    this.coords = {x: x, y: y};
    this.toDelete = false;
    setTimeout(() => {
      this.toDelete = true;
    }, lifeSpan*1000);
  }

  handle(rocket) {
    // Do something to the rocket
  }
}

/** 
 * this powerup gives the player extra ammo
 */
class AmmoPickup extends PowerUp {
  constructor(x, y, lifeSpan, amt) {
    super(x, y, lifeSpan);
    this.amt = amt;
    this.type = "ammo";
  }

  handle(rocket) {
    rocket.reload(this.amt);
  }
}

/**
 * this powerup gives the player a speedboost
 */
class SpeedBoost extends PowerUp {
  constructor(x, y, lifeSpan, duration) {
    super(x, y, lifeSpan);
    this.duration = duration;
    this.type = "boost";
  }

  handle(rocket) {
    rocket.boost(true);
    this.rocket = rocket; // storing the rocket to use in the callback
    setTimeout(() => {
      this.rocket.boost(false);
    }, this.duration*1000);
  }
}

/**
 * builds a powerup of a given type and returns it 
 * @param {string} type determines the type of powerup that will be built
 */
function powerupFactory(type) {
  let powerup;
  console.log("powerup")
  switch (type) {
    case "ammo":
      powerup = new AmmoPickup(
        util.randomInt(config.WIDTH-30)+15,
        util.randomInt(config.HEIGHT-30)+15,
        util.randomInt(10)+config.MIN_LIFESPAN,
        config.MAX_AMMO
      );
      break;
    case "boost":
      powerup = new SpeedBoost(
        util.randomInt(config.WIDTH-30)+15,
        util.randomInt(config.HEIGHT-30)+15,
        util.randomInt(10)+config.MIN_LIFESPAN,
        util.randomInt(5)+config.MIN_BOOST_DURATION
      );
      break;
    }
    return powerup;
}

// only expose the factory
module.exports.factory = powerupFactory;