const collisions = require('./collision');
const Rocket = require('./rocket');
const Bullet = require('./bullet');
const powerups = require('./powerUp');

class Game {
  constructor() {
    // arrays and dicts to keep track of all the objects in the game
    this.ids = [];
    this.players = {};
    this.bullets = [];
    this.powerups = [];
    this.d = new Date(); // TODO why????
  }

  /**
   * Adding and removing objects to the game
   */

  addPlayer(playerId, username) {
    this.ids.push(playerId);
    this.players[playerId] = new Rocket(200, 150, playerId, username);
  }

  addBullet(playerId) {
    this.bullets.push(new Bullet(
      this.players[playerId].getCoords(),
      this.players[playerId].getHeading(),
      playerId,
    ));
  }

  addPowerup(type) {
    this.powerups.push(powerups.factory(type));
  }

  removePlayer(playerId) {
    this.ids = this.ids.filter((item) => item !== playerId);
    delete this.players[playerId];
  }

  /**
   * Removes all objects in the game that have their toDelete flag set
   */
  removeObjects() {
    this.ids.forEach((playerId) => {
      if (this.players[playerId].toDelete) {
        this.removePlayer(playerId);
      }
    });
    this.bullets = this.bullets.filter((bullet) => !bullet.toDelete);
    this.powerups = this.powerups.filter((powerup) => !powerup.toDelete);
  }


  /**
   * Updating all the objects in the game
   */

  update() {
    this.updatePlayers();
    this.updateBullets();
    this.checkCollisions();
    // TODO even better system for powerup spawnrates
    if (Math.random() > 0.99) {
      if (Math.random() > 0.66) {
        this.addPowerup('boost');
      } else {
        this.addPowerup('ammo');
      }
    }
  }

  updatePlayers() {
    this.ids.forEach((playerId) => {
      if (this.players[playerId]) { // only update a player if it still exists
        this.players[playerId].update();
        this.players[playerId].turn(this.players[playerId].dir);
      }
    });
  }

  updateBullets() {
    this.bullets.forEach((bullet) => {
      bullet.update();
      if (collisions.bulletEdges(bullet)) {
        bullet.delete();
      }
    });
  }

  checkCollisions() {
    collisions.checkCollisions(this.players, this.bullets, this.powerups);
    this.removeObjects();
  }

  /**
   * Handles the input from a player
   * @param {*} playerId id of the player sending input
   * @param {*} input object containing the inputs
   */
  handleInput(playerId, input) {
    const player = this.players[playerId];
    if (!player) return;

    // handle shooting
    if (input.SPACE) {
      if (player.hasAmmo()) { // only shoot if the player has ammo
        player.shoot();
        this.addBullet(playerId);
      }
      return; // do nothing else but shoot
    }

    // handle turning
    if (input.LEFT_ARROW || input.RIGHT_ARROW) {
      player.dir = input.LEFT_ARROW ? -1 : 1;
    } else {
      player.dir = 0;
    }

    // handle accelerating
    player.thrust(input.UP_ARROW);
  }

  /**
   * getters for the server to send the objects to the client
   */

  getRockets() {
    const rockets = [];
    this.ids.forEach((id) => {
      rockets.push({
        coords: this.players[id].coords,
        angle: this.players[id].angle,
        thrusting: this.players[id].thrusting,
        ammo: this.players[id].ammo,
        username: this.players[id].username,
        id,
      });
    });
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
