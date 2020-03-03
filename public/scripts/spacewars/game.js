let socket;
let inputs;
let rockets;
let powerups;
let ammo;
let id;

function preload() {
  // we load all our images first
  loadImages();

  // open a socket connection
  // TODO connect to server ip
  socket = io.connect('http://localhost:8080');

  // handle messages from the socket
  socket.on('connected', onConnection);
  socket.on('view', updateView);
}

function onConnection(data) {
  id = data.id;
  // create a canvas and put it in the div #canvasContainer
  createCanvas(data.window.width, data.window.height).parent('canvasContainer');
}

/**
 * handles data from the server about the objects in the game
 * @param {*} data the objects in the game
 */
function updateView(data) {
  rockets = data.rockets;
  bullets = data.bullets;
  powerups = data.powerups;
  // find our rocket
  for (const rocket of rockets) {
    ammo = rocket.id == id ? rocket.ammo : ammo;
  }
}

function setup() {
  rockets = [];
  bullets = [];
  powerups = [];
  ammo = 5;

  inputs = {
    LEFT_ARROW: false,
    RIGHT_ARROW: false,
    UP_ARROW: false,
    DOWN_ARROW: false,
    SPACE: false,
  };
}

function draw() {
  // repeats every frame
  background(50);

  drawAmmo();

  for (const powerup of powerups) {
    drawPowerUp(powerup);
  }

  for (const rocket of rockets) {
    drawRocket(rocket);
  }
  for (const bullet of bullets) {
    drawBullet(bullet);
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
      socket.emit('input', { SPACE: true });
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


// TODO add comments
