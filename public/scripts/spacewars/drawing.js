let rocketImg;
let rocketAccelerateImg;
let images;

function scaledTranslate(coords) {
  translate(coords.x * coordScale.width, coords.y * coordScale.height);
}

function loadImages() {
  images = {
    rocket: {
      neutral: loadImage('/img/rocket.png'),
      thrusting: loadImage('/img/rocketAccelerate.png'),
    },
    powerup: {
      ammo: loadImage('/img/ammo.png'),
      boost: loadImage('/img/boost.png'),
    },
  };
}

function drawRocket(rocket) {
  // TODO extend flame when boosting
  rectMode(CENTER);
  imageMode(CENTER);
  if (rocket.id === id) {
    // TODO diffrent image for our own rocket
  } else {

  }
  push();
  scaledTranslate(rocket.coords);

  fill(255);
  textSize(10);
  textAlign(CENTER);
  text(rocket.username, 0, -20);

  rotate(rocket.angle + (Math.PI / 2));
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
  fill('red');
  noStroke();
  push();
  scaledTranslate(bullet.coords);
  ellipse(0, 0, 5);
  pop();
}

function drawPowerUp(powerup) {
  ellipseMode(CENTER);
  fill(powerup.type == 'ammo' ? 'green' : 'yellow');
  noStroke();
  push();
  scaledTranslate(powerup.coords);
  ellipse(0, 0, 15);
  image(images.powerup[powerup.type], 0, 0, 12, 12);
  pop();
}

function drawAmmo() {
  ellipseMode(CENTER);
  fill('red');
  noStroke();
  for (let i = 0; i < ammo; i++) {
    ellipse(10 + 10 * i, 10, 8);
  }
}
