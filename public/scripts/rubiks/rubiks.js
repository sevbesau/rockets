let C; let
  U;
let rotx = 0;
let roty = 0;
const W = 100;
const colors = ['yellow', 'orange', 'green', 'white', 'red', 'blue'];
const faces = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, -1],
];
let img;
const offsetY = 70;
let cam;

function preload() {
  // runs before setup
  img = loadImage('/img/grid.jpg');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - offsetY);
}

function setup() {
  // runs once on startup
  createCanvas(windowWidth, windowHeight - offsetY, WEBGL).parent('canvasContainer');
  top = createGraphics(windowWidth, (windowHeight - offsetY) * 0.90, WEBGL);
  bot = createGraphics(windowWidth, (windowHeight) * 0.10, WEBGL);
  // make a new cube object
  C = new Cube(W);
  U = new Ui();
}

function draw() {
  // repeats every frame
  background(50);

  // camera movement
  push();
  rotateX(-rotx);
  rotateY(-roty);

  // draw the cube
  C.show();
  pop();

  U.show();
}

function mouseDragged() {
  // executes when the mouse is dragged acros the canvas
  const rate = 0.01;
  rotx += (pmouseY - mouseY) * rate;
  roty += (pmouseX - mouseX) * rate;
}

function keyPressed() {
  C.Rot(key);
}

function mouseClicked() {
  U.clicked(mouseX, mouseY);
}

function rX(pos, angle) {
  const { x } = pos;
  const y = Math.round(pos.y * Math.cos(angle) - pos.z * Math.sin(angle));
  const z = Math.round(pos.y * Math.sin(angle) + pos.z * Math.cos(angle));
  return new Coord(x, y, z);
}

function rY(pos, angle) {
  const x = Math.round(pos.z * Math.sin(angle) + pos.x * Math.cos(angle));
  const { y } = pos;
  const z = Math.round(pos.z * Math.cos(angle) - pos.x * Math.sin(angle));
  return new Coord(x, y, z);
}

function rZ(pos, angle) {
  const x = Math.round(pos.x * Math.cos(angle) - pos.y * Math.sin(angle));
  const y = Math.round(pos.x * Math.sin(angle) + pos.y * Math.cos(angle));
  const { z } = pos;
  return new Coord(x, y, z);
}
