const Auditor = require("./auditor.js");
const dgram = require("dgram");
const net = require("net");

const socket = dgram.createSocket("udp4");
const auditor = new Auditor(socket);
auditor.listen();

const server = net.createServer();
server.on("connection", (conn) => {
    console.log("Client connected");
    conn.write(JSON.stringify(auditor.getActiveMuscians()));
});

server.listen(8080, function () {
    console.log("server listening to %j", server.address());
});
