function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
}

function playerBullet(playerCoords, bulletCoords) {
  return util.dist(playerCoords.x, playerCoords.y, bulletCoords.x, bulletCoords.y) < 20;
}

function playerPowerUp(playerCoords, powerUpCoords) {

}