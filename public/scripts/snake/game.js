// TODO refactor and comment
let score;
let scale;
let container;
let canvas;
const SECTIONS = 20;
let growing = true;

function calculateCanvasSize() {
  container = {
    width: windowWidth,
    height: document.getElementById('canvasContainer').offsetHeight,
  }
  canvas = { 
    width: container.width > container.height ? container.height : container.width, 
    height: container.width > container.height ? container.height : container.width, 
  }
  scale = canvas.width / SECTIONS;
}

function windowResized() {
  resizeCanvas(5, 5);
  calculateCanvasSize();
  resizeCanvas(canvas.width, canvas.height);
}

function setup() {
  calculateCanvasSize();
  createCanvas(canvas.width, canvas.height).parent('canvasContainer');

  snake = new Snake();
  apple = new Apple(createVector(Math.floor(random(0, 20)), Math.floor(random(0, 20))));
  frameRate(10);
  score = 0;
}

function draw() {
  background(51);
  textSize(50);
  text(score, 10, 50);

  apple.draw();

  snake.update();
  snake.draw();
  
  if (snake.isEatingItself()) {
    snake.die();
    postScore(score);
    score = 0;
  }

  if (snake.coords.equals(apple.coords)) {
  	snake.grow();
  	apple.update(createVector(Math.floor(random(0, 20)), Math.floor(random(0, 20))));
  	score += 10;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && snake.vel.y != 1) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && snake.vel.y != -1) {
    snake.dir(0, 1);
  } else if (keyCode === LEFT_ARROW && snake.vel.x != 1) {
    snake.dir(-1, 0);
  } else if (keyCode === RIGHT_ARROW && snake.vel.x != -1) {
    snake.dir(1, 0);
  }
}
