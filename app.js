const express = require('express');
const socket = require('socket.io');

const routes = require('./routes/index');
const Game = require('./bin/game');
const config = require('./bin/config');

// start an express app
let app = express();
let server = app.listen(8080);

// set up template engine
app.set('views', './views');
app.set('view engine', 'jade');

// host the files in the 'public' folder
app.use(express.static('public'));

// define the routes for /
app.use('/', routes);

// create a server socket
let io = socket(server);

// bind a socket connection to a funciton
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log("new connection from: "+socket.id);
  game.addPlayer(socket.id);
  socket.emit('connected', {
    id: socket.id,
    window: {width: config.WIDTH, height: config.HEIGHT}
  }); 

  socket.on('input', handleInput);
  socket.on('disconnect', disconnected);

  function handleInput(input) {
    console.log("new input from: "+socket.id);
    game.playerInput(socket.id, input);
  }

  function disconnected() {
    // TODO
  }
}

// "render" loop
function sendView() {
  io.emit('view', {
    rockets: game.getRockets(), 
    bullets: game.getBullets()
  })
  setTimeout(sendView, config.UPDATE_VIEW_INTERVAL);
}

// physics loop
function updateGame() {
  game.update();
  setTimeout(updateGame, config.UPDATE_GAME_INTERVAL);
}

let game = new Game();

// start the game loops
sendView();
updateGame();

console.log("Server running...");