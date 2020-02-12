const EventEmitter = require('events');

const collisions = require('./collision');
const Rocket = require('./rocket');
const Bullet = require('./bullet');
const powerups = require('./powerUp');
const config = require('./config');

class Game extends EventEmitter {

  constructor() {
    super();
    this.ids = [];
    this.players = {};
    this.bullets = [];
    this.powerups = [];
  }

  addPlayer(playerId) {
    this.ids.push(playerId);
    this.players[playerId] = new Rocket(200, 150);
    this.players[playerId].dir = 0;
  }

  removePlayer(playerId) {
    this.ids = this.ids.filter(item => item !== playerId);
    this.players[playerId] = undefined;
  }

  addBullet(playerId) {
    this.bullets.push(new Bullet(
      this.players[playerId].getCoords(),
      this.players[playerId].getHeading(),
      playerId
    ));
  }

  removeBullet(bullet) {
    this.bullets = this.bullets.filter((item) => item !== bullet);
  }

  addPowerup(type) {
    if (type === "ammo") {
      this.powerups.push(new powerups.AmmoPickup(
        Math.random(15, config.WIDTH-15),
        Math.random(15, config.HEIGHT-15),
        Math.random(0, 10)+config.MIN_LIFESPAN,
        config.MAX_AMMO
      ));
    }
  }

  removePowerup(powerup) {
    this.powerups = this.powerups.filter((item) => item !== powerup);
  }

  removeObjects() {
    for (let playerId of this.ids) {
      if (this.players[playerId].toDelete) {
        this.removePlayer(playerId);
      }
    }
    for (let bullet of this.bullets) {
      if (bullet.toDelete) {
        this.removeBullet(bullet);
      }
    }
    for (let powerup of this.powerups) {
      if (powerup.toDelete) {
        this.removeBullet(powerup);
      }
    }
  }

  handleInput(playerId, input) {

    // handle shooting
    if (input.SPACE) {
      if (this.players[playerId].hasAmmo()) { // only shoot if the player has ammo
        this.players[playerId].shoot();
        this.addBullet(playerId);
        this.emit('ammo', {ammo: this.players[playerId].ammo});
      }
      return // do nothing else but shoot
    }

    // handle turning
    if (input.LEFT_ARROW || input.RIGHT_ARROW) {
      this.players[playerId].dir = input.LEFT_ARROW ? -1 : 1;
    } else {
      this.players[playerId].dir = 0;
    }

    // handle accelerating
    this.players[playerId].thrust(input.UP_ARROW);
  }

  update() {
    this.updatePlayers();
    this.updateBullets();
    this.checkCollisions();
    // if (Math.random(1000) > 999) {
    //   this.addPowerup("ammo");
    // }
  }

  updatePlayers() {
    for (let playerId of this.ids) {
      if (this.players[playerId]) { // only update a player if it still exists
        this.players[playerId].update();
        this.players[playerId].turn(this.players[playerId].dir);
      }
    }
  }

  updateBullets() {
    for (let bullet of this.bullets) {
      bullet.update();
      if (bullet.collidesWithEdges()) this.removeBullet(bullet)
    }
  }

  checkCollisions() {
    for (let playerId of this.ids) {
      for (let bullet of this.bullets) {
        if (
          playerId !== bullet.ownerId &&
          collisions.playerBullet(this.players[playerId].coords, bullet.coords)
        ) {
          this.players[playerId].toDelete = true;
          bullet.toDelete = true;
        }
      }
    }
    this.removeObjects();
  }

  getRockets() {
    let rockets = [];
    for (let id of this.ids) {
      rockets.push({
        coords: this.players[id].coords, 
        angle: this.players[id].angle, 
        thrusting: this.players[id].thrusting,
        ammo: this.players[id].ammo,
        id: id
      })
    }
    return rockets;
  }

  getBullets() {
    return this.bullets;
  }

  getPowerups() {
    return this.powerups;
  }
}

module.exports = Game;