// Utils:
const express = require("express");

// Server config:
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server);

// Bike stations utils:
const BikeStation = require('./stations-management').BikeStation;

io.on('connection', (socket) => {
  const targetStationId = socket.handshake.query.id;
  console.log('Just received a connection on station: ' + targetStationId + ':)');

  const targetStation = new BikeStation(targetStationId);
  targetStation.listenToUpdates((data) => {
    socket.emit('dataUpdate', { data: data });
  });

});

const port = process.env.PORT || 4001;
server.listen(port, () => console.log(`Listening on port ${port}`));