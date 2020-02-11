const Rocket = require('./rocket');
const Bullet = require('./bullet');
const config = require('./config')

class Game {

  // TODO
  // rocket has limited shots
  // ammo pickups
  // powerups ?

  constructor() {
    this.ids = []
    this.players = {};
    this.bullets = [];
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
    this.bullets = this.bullets.filter((item) => item !== bullet)
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
  }

  playerInput(playerId, input) {
    // handle shooting
    if (input.SPACE) {
      this.addBullet(playerId);
      return 
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
  }

  updatePlayers() {
    for (let playerId of this.ids) {
      this.players[playerId].update();
      this.players[playerId].turn(this.players[playerId].dir);
    }
  }

  updateBullets() {
    for (let bullet of this.bullets) {
      bullet.update();
      if (bullet.collidesWithEdges()) this.removeBullet(bullet)
    }
  }

  checkCollisions() {
    // TODO
    // dont delete when iterating!!
    for (let playerId of this.ids) {
      for (let bullet of this.bullets) {
        if (
          playerId !== bullet.ownerId &&
          this.players[playerId].collidesWithBullet(bullet.getCoords())
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
        id: id
      })
    }
    return rockets;
  }

  getBullets() {
    return this.bullets;
  }
}

module.exports = Game;