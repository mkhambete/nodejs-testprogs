
var exec = require("child_process").exec;
var getCounter = require("./udplistener").getCounter;

const dgram = require('dgram');

function start(response) {
  console.log("Request handler 'start' was called.");

  exec("ls -lah", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
}

function upload(response) {
  console.log("Request handler 'upload' was called.");

  const message = Buffer.from('0001');
  const client = dgram.createSocket('udp4');
  client.send(message, 55156, '192.168.0.181', (err) => {
    client.close();
  });
  response.writeHead(200, {"Content-Type": "text/plain"});
  var buff = new Buffer(getCounter());
  console.log("The counter value = " + buff);
  response.write(buff);
  response.end();

}

function processes(response) {
  console.log("Request handler 'processes' was called.");

  exec("ps -af", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
}

exports.start = start;
exports.upload = upload;
exports.processes = processes;
