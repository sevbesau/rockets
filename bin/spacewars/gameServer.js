const socket = require('socket.io');
const sharedSession = require('express-socket.io-session');

const Game = require('./gameEngine');
const config = require('./config');
//const { getUserById } = require('../../models/database');

// TODO link up session and socketio connection
let io;
let game;

module.exports.start = function start(server, session) {
  // create a game engine object
  game = new Game();

  // create a server socket
  io = socket(server);
  //io.use(sharedSession(session));

  // bind a socket connection to a funciton
  io.sockets.on('connection', newConnection);

  // start the game loops
  setInterval(sendView, config.UPDATE_VIEW_INTERVAL);
  setInterval(updateGame, config.UPDATE_GAME_INTERVAL);
};

/**
 * gets excecuted when a client connects to a socket,
 * handles sending data between the game engine and the client
 * @param {socket} socket the socket the client connected to
 */
async function newConnection(socket) {
  // TODO allow users only one connection
  // get the username for the user connecting with this socket
  let username = 'guest';
  try {
    if (socket.handshake.session.passport) {
      const user = await getUserById(socket.handshake.session.passport.user);
      username = user.username;
    }
  } catch (err) {
    console.log('[gameserver]', err);
  }
  console.log(`[gameServer] new connection from ${username}, socketid: ${socket.id}`);

  // add a player to the game, and let the client know he's connected
  game.addPlayer(socket.id, username);
  socket.emit('connected', {
    id: socket.id,
    window: { width: config.WIDTH, height: config.HEIGHT },
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
    console.log(`[gameserver] lost connection to: ${socket.id}`);
  }
}

/**
 * sends all the objects in the game to the client
 */
function sendView() {
  io.emit('view', {
    rockets: game.getRockets(),
    bullets: game.getBullets(),
    powerups: game.getPowerups(),
  });
}

/**
 * updates all the objects in the game
 */
function updateGame() {
  game.update();
}
