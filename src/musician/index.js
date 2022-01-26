const Musician = require('./musician.js')
const instruments = require("../shared/instruments");
const dgram = require('dgram');

const instrumentsKeys = Object.keys(instruments);

let socket = dgram.createSocket('udp4');
let musician = new Musician(instrumentsKeys[instrumentsKeys.length * Math.random() << 0]);

musician.play(socket);


