const instruments = require("../shared/instruments");
const protocol = require("../shared/protocol");
const { v4: uuidv4 } = require('uuid');
const dgram = require('dgram');

let id = uuidv4();
let socket = dgram.createSocket('udp4');

socket.send(id, 0, id.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, function(err, bytes) {
    console.log("Sending payload: " + id + " via port " + socket.address().port);
});

