const express = require('express');

const routes = require('./routes/index');
const gameServer = require('./bin/gameServer')

// start an express app
let app = express();

// start the servers
let server = app.listen(8080);
gameServer.start(server);


// set up template engine
app.set('views', './views');
app.set('view engine', 'jade');

// host the files in the 'public' folder
app.use(express.static('public'));

// define the routes for /
app.use('/', routes);


console.log("Server running...");