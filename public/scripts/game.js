let WIDTH, HEIGHT;

let socket;
let inputs;
let rokcets;
let ammo;
let id;

let rocketImg;
let rocketAccelerateImg;

function preload() {
  rocketImg = loadImage('/img/rocket.png');
  rocketAccelerateImg = loadImage('/img/rocketAccelerate.png');

  // open a socket connection
  socket = io.connect('http://localhost:8080');

  // handle messages from the socket
  socket.on('connected', onConnection);
  socket.on('view', updateView);
  socket.on('ammo', updateAmmo);

}

function onConnection(data) {
  id = data.id;
  // create a canvas and put it in the div #canvasContainer
  createCanvas(data.window.width, data.window.height).parent('canvasContainer');
}

function updateView(data) {
  rockets = data.rockets;
  bullets = data.bullets;
}

function updateAmmo(data) {
  ammo = data.ammo;
}

function setup() {
  rockets = [];
  bullets = [];
  ammo = 5;

  inputs = {
    LEFT_ARROW: false,
    RIGHT_ARROW: false,
    UP_ARROW: false,
    DOWN_ARROW: false, 
    SPACE: false
  }
}

function draw() {
  // repeats every frame
  background(50);
  
  drawAmmo();

  for (let rocket of rockets) {
    drawRocket(rocket);
  }
  for (let bullet of bullets) {
    drawBullet(bullet)
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

function keyPressed() {
  let newInput = false;
  switch (keyCode) {
    case UP_ARROW:
      inputs.UP_ARROW = true;
      newInput = true;
      break;
    case RIGHT_ARROW:
      inputs.RIGHT_ARROW = true;
      newInput = true;
      break;
    case LEFT_ARROW:
      inputs.LEFT_ARROW = true;
      newInput = true;
      break;
    case DOWN_ARROW:
      inputs.DOWN_ARROW = true;
      newInput = true;
      break;
    case 32: // SPACE
      socket.emit('input', {SPACE: true})
      break;
  }
  if (newInput) socket.emit('input', inputs); // only send input if there is new input
  return false; // prevent any default behavior
}

function keyReleased() {
  let newInput = false;
  switch (keyCode) {
    case UP_ARROW:
      inputs.UP_ARROW = false;
      newInput = true;
      break;
    case RIGHT_ARROW:
      inputs.RIGHT_ARROW = false;
      newInput = true;
      break;
    case LEFT_ARROW:
      inputs.LEFT_ARROW = false;
      newInput = true;
      break;
    case DOWN_ARROW:
      inputs.DOWN_ARROW = false;
      newInput = true;
      break;
  }
  if (newInput) socket.emit('input', inputs); // only send input if there is new input
  return false; // prevent any default behavior
}