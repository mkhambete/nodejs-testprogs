
var dgram = require('dgram');

bikeTrainerCounter = 0;

function getCounter() {
  return bikeTrainerCounter;
}

function startUdpListener() {

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  bikeTrainerCounter = msg;
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(55256, '192.168.0.108');

}

exports.startUdpListener = startUdpListener;
exports.getCounter = getCounter;
