const Auditor = require('./auditor.js')
const dgram = require("dgram");

const socket = dgram.createSocket("udp4");


const auditor = new Auditor(socket);

auditor.listen();

