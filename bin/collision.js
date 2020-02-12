const config = require("./config");

// TODO move to utils package?
function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
}

module.exports.bulletEdges = function bulletEdges(bullet) {
    return (
      bullet.coords.x < 0 || 
      bullet.coords.x > config.WIDTH ||
      bullet.coords.y < 0 || 
      bullet.coords.y > config.HEIGHT
    )
}

//module.exports.playerBullet = playerBullet;
function playerBullet(playerCoords, bulletCoords) {
  return dist(playerCoords.x, playerCoords.y, bulletCoords.x, bulletCoords.y) < 20;
}

//module.exports.playerPowerUp = playerPowerUp;
function playerPowerUp(playerCoords, powerUpCoords) {
  return dist(playerCoords.x, playerCoords.y, powerUpCoords.x, powerUpCoords.y) < 20;
}

//module.exports.checkPowerupCollisions = checkPowerupCollisions;
function checkPowerupCollisions(player, powerups) {
  for (let powerup of powerups) {
    if (playerPowerUp(player.coords, powerup.coords)) {
      powerup.handle(player);
      powerup.toDelete = true;
    }
  }
}

//module.exports.checkBulletCollisions = checkBulletCollisions;
function checkBulletCollisions(player, bullets) {
  for (let bullet of bullets) {
    if (
      player.id !== bullet.ownerId &&
      playerBullet(player.coords, bullet.coords)
    ) {
      player.toDelete = true;
      bullet.toDelete = true;
    }
  }
}

module.exports.checkCollisions = function(players, bullets, powerups) {
  let player;
  Object.keys(players).forEach((key, index) => {
    player = players[key];
    checkBulletCollisions(player, bullets);
    checkPowerupCollisions(player, powerups); 
  });
}

// TODO add comments