
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var udpListener = require("./udplistener");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/processes"] = requestHandlers.processes;

udpListener.startUdpListener();
server.start(router.route, handle);
