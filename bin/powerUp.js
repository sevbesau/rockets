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

class AmmoPickup extends PowerUp {
  constructor(x, y, lifeSpan, amt) {
    super(x, y, lifeSpan);
    this.amt = amt;
  }

  handle(rocket) {
    rocket.reload(this.amt);
  }
}

class SpeedBoost extends PowerUp {
  constructor(x, y, lifeSpan, duration) {
    super(x, y, lifeSpan);
    this.duration = duration;
  }

  handle(rocket) {
    rocket.boost(true);
    setTimeout((rocket) => {
      rocket.boost(false);
    }, this.duration*1000);
  }
}

module.exports.SpeedBoost = SpeedBoost;
module.exports.AmmoPickup = AmmoPickup;