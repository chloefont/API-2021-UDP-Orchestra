const Musician = require("./musician.js");
const instruments = require("../shared/instruments");
const dgram = require("dgram");

const instrumentsKeys = Object.keys(instruments);
const rdmKey = instrumentsKeys[(instrumentsKeys.length * Math.random()) << 0];

let socket = dgram.createSocket("udp4");
let musician = new Musician(rdmKey);

musician.play(socket);
