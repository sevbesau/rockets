const config = require("./config");

// TODO take out the root https://www.youtube.com/watch?v=Cl_Gjj80gPE 22min
/**
 * Calculates the euclidean distance between two points 
 * @param {*} x1 x coord of point1
 * @param {*} y1 y coord of point1
 * @param {*} x2 x coord of point2 
 * @param {*} y2 y coord of point2
 */
function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
}

/**
 * Returns true if the given bullet collides with the edges of the canvas 
 * @param {*} bullet the bullet to check for 
 */
function bulletEdges(bullet) {
    return (
      bullet.coords.x < 0 || 
      bullet.coords.x > config.WIDTH ||
      bullet.coords.y < 0 || 
      bullet.coords.y > config.HEIGHT
    )
}

/**
 * Returns true if the player and bullet collide
 * @param {*} playerCoords coordinates of the player
 * @param {*} bulletCoords coordinates of the bullet
 */
function playerBullet(playerCoords, bulletCoords) {
  return dist(playerCoords.x, playerCoords.y, bulletCoords.x, bulletCoords.y) < 20;
}

/**
 * Returns true if the player and powerup collide
 * @param {*} playerCoords coordinates of the player
 * @param {*} powerUpCoords coordinates of the powerup 
 */
function playerPowerUp(playerCoords, powerUpCoords) {
  return dist(playerCoords.x, playerCoords.y, powerUpCoords.x, powerUpCoords.y) < 20;
}

/**
 * Checks collisions between a player and all the powerups.
 * Sets the toDelete flag is a collision is found
 * @param {*} player the player to check
 * @param {*} powerups array of powerups
 */
function checkPowerupCollisions(player, powerups) {
  for (let powerup of powerups) {
    if (playerPowerUp(player.coords, powerup.coords)) {
      powerup.handle(player);
      powerup.toDelete = true;
    }
  }
}

/**
 * Checks collisions between a player and all the bullets.
 * Sets the toDelete flag is a collision is found
 * @param {*} player the player to check
 * @param {*} bullets array of bullets 
 */
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

/**
 * Checks collisions between all the given objects 
 * @param {*} players object containing players
 * @param {*} bullets array containing bullets
 * @param {*} powerups array containing powerups 
 */
function checkCollisions(players, bullets, powerups) {
  let player;
  Object.keys(players).forEach((key, index) => {
    player = players[key];
    checkBulletCollisions(player, bullets);
    checkPowerupCollisions(player, powerups); 
  });
}

module.exports.bulletEdges = bulletEdges;
module.exports.checkCollisions = checkCollisions