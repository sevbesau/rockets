const socket = require('socket.io');

const Game = require('./gameEngine');
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

/**
 * gets excecuted when a client connects to a socket,
 * handles sending data between the game engine and the client
 * @param {socket} socket the socket the client connected to
 */
function newConnection(socket) {
  console.log("new connection from: "+socket.id);

  // add a player to the game, and let the client know he's connected
  game.addPlayer(socket.id);
  socket.emit('connected', {
    id: socket.id,
    window: {width: config.WIDTH, height: config.HEIGHT}
  }); 

  // callbacks to handle messages from the client
  socket.on('input', handleInput);
  socket.on('disconnect', disconnected);

  // sends the input from the client to the gameEngine
  function handleInput(input) {
    game.handleInput(socket.id, input);
  }

  // removes a client from the game if he disconnects
  function disconnected() {
    game.removePlayer(socket.id);
    console.log("lost connection to: "+socket.id)
  }
}

/**
 * sends all the objects in the game to the client
 */
function sendView() {
  io.emit('view', {
    rockets: game.getRockets(), 
    bullets: game.getBullets(),
    powerups: game.getPowerups()
  })
}

/**
 * updates all the objects in the game
 */
function updateGame() {
  game.update();
}
