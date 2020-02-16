// TODO refactor and comment
var score
	
function setup() {
  // runs once on startup
  createCanvas(600, 400).parent('canvasContainer');

  s = new Snake(20);
  a = new Apple(70, 70);
  frameRate(10);
  score = 0;
}

function draw() {
  // repeats every frame
  background(51);
  textSize(50);
  text(score, 10, 50);
  
  a.draw();
  s.update();
  s.draw();
  score = s.death(score);
  
  if (s.x == a.x-10 && s.y == a.y-10) {
  	s.grow();
  	a.update();
  	score += 10;
  }
}

function keyPressed() {
	if (keyCode === UP_ARROW && s.yvel != 1) {
		s.dir(0, -1);
	} else if (keyCode === DOWN_ARROW && s.yvel != -1) {
		s.dir(0, 1);
	} else if (keyCode === LEFT_ARROW && s.xvel != 1) {
		s.dir(-1, 0);
	} else if (keyCode === RIGHT_ARROW && s.xvel != -1) {
		s.dir(1, 0);
	}
}
