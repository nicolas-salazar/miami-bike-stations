// Utils:
const express = require("express");

// Server config:
const app = express();
const cors = require('cors');
const server = require('http').Server(app)
const io = require('socket.io')(server);

app.use(cors());

// Bike stations utils:
const BikeStationsNetwork = require('./stations-management').BikeStationsNetwork;

io.on('connection', (socket) => {
  const networkId = socket.handshake.query.id;
  console.log('Just received a connection on network: ' + networkId + ':)');

  const myBikeStationsNetwork = new BikeStationsNetwork(networkId);
  myBikeStationsNetwork.listenToUpdates((networkData) => {
    socket.emit('dataUpdate', {
      'network': networkData,
      'date': new Date(),
    });
  });

});

const port = process.env.PORT || 4001;
server.listen(port, () => console.log(`Listening on port ${port}`));