let rocketImg;
let rocketAccelerateImg;
let images;

function loadImages() {
  images = {
    rocket: {
      neutral: loadImage('/img/rocket.png'),
      thrusting: loadImage('/img/rocketAccelerate.png')
    },
    powerup: {
      ammo: loadImage('/img/ammo.png'),
      boost: loadImage('/img/boost.png')
    }
  }
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
    image(images.rocket.thrusting, 0, 0);
  } else {
    image(images.rocket.neutral, 0, 0);
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
  image(images.powerup[powerup.type], 0, 0, 12, 12)
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