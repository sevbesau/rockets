let socket;
let inputs;
let rockets;
let powerups;
let ammo;
let score;
let alive;
let id;
let coordScale = { width: 1, height: 1 }
let windowSize;

function preload() {
  // we load all our images first
  loadImages();

  // open a socket connection
  socket = io.connect(`${window.location.protocol}//${window.location.host}`);

  // handle messages from the socket
  socket.on('connected', onConnection);
  socket.on('view', updateView);
}

function onConnection(data) {
  id = data.id;
  windowSize = data.window;

  // create a canvas and put it in the div #canvasContainer
  canvasWidth = windowWidth;
  canvasHeight = document.getElementById('canvasContainer').offsetHeight;
  coordScale.width = canvasWidth / windowSize.width;
  coordScale.height = canvasHeight / windowSize.height;
  createCanvas(canvasWidth, canvasHeight).parent('canvasContainer');
}

function windowResized() {
  resizeCanvas(5, 5);
  canvasWidth = windowWidth;
  canvasHeight = document.getElementById('canvasContainer').offsetHeight;
  coordScale.width = canvasWidth / windowSize.width;
  coordScale.height = canvasHeight / windowSize.height;
  resizeCanvas(canvasWidth, canvasHeight);
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
    if (rocket.id == id) {
      ammo = rocket.ammo;
      score = rocket.score;
      alive = rocket.alive;
    }
  }
}

function setup() {
  rockets = [];
  bullets = [];
  powerups = [];
  ammo = 5;
  score = 0;
  alive = true;

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
  
  if (!alive) {
    if (confirm('You died...\nPlay again?')) {
      alive = true;
      socket.emit('respawn');
    } else {
      window.location.href = '/'
    }  
    postScore(score);
  }

  drawAmmo();
  drawScore(score);

  for (const powerup of powerups) {
    drawPowerUp(powerup);
  }

  for (const rocket of rockets) {
    if (rocket.alive)
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
