let rocketImg;
let rocketAccelerateImg;

function loadImages() {
  rocketImg = loadImage('/img/rocket.png');
  rocketAccelerateImg = loadImage('/img/rocketAccelerate.png');
}

function drawRocket(rocket) {
  rectMode(CENTER);
  imageMode(CENTER);
  if (rocket.id === id) {
    stroke(0, 255, 0);
  } else {
    stroke(255);
  }
  push();
  translate(rocket.coords.x, rocket.coords.y);
  rotate(rocket.angle+(Math.PI/2));
  scale(0.3);
  if (rocket.thrusting) {
    image(rocketAccelerateImg, 0, 0);
  } else {
    image(rocketImg, 0, 0);
  }
  pop();
}

function drawBullet(bullet) {
  ellipseMode(CENTER);
  fill("red")
  noStroke()
  push();
  translate(bullet.coords.x, bullet.coords.y);
  ellipse(0, 0, 5);
  pop();
}

function drawPowerUp(powerup) {
  ellipseMode(CENTER);
  fill("green")
  noStroke()
  push();
  translate(powerup.coords.x, powerup.coords.y);
  ellipse(0, 0, 15);
  pop();
}

function drawAmmo() {
  ellipseMode(CENTER);
  fill("red")
  noStroke()
  coords = {x: 10, y: 10};
  for (let i = 0; i < ammo; i++) {
    ellipse(coords.x, coords.y, 8);
    coords.x += 13;
  }
}