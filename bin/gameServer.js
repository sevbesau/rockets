const socket = require('socket.io');

const Game = require('./game');
const config = require('./config');

let game, io;

module.exports.start = function start(server) {
  // create a game engine object
  game = new Game()

  // create a server socket
  io = socket(server);

  // bind a socket connection to a funciton
  io.sockets.on('connection', newConnection);

  // start the game loops
  setInterval(sendView, config.UPDATE_VIEW_INTERVAL);
  setInterval(updateGame, config.UPDATE_GAME_INTERVAL);
}

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
    game.playerInput(socket.id, input);
  }

  function disconnected() {
    console.log("lost connection to: "+socket.id)
    game.removePlayer(socket.id)
    // TODO
  }
}

// "render" loop
function sendView() {
  io.emit('view', {
    rockets: game.getRockets(), 
    bullets: game.getBullets()
  })
}

// physics loop
function updateGame() {
  game.update();
}
