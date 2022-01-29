const Auditor = require("./auditor.js");
const dgram = require("dgram");
const net = require("net");

const socket = dgram.createSocket("udp4");
const auditor = new Auditor(socket);
auditor.listen();

const server = net.createServer();
server.on("connection", (conn) => {
    console.log("Client connected");
    auditor.checkActiveMusicians();
    conn.write(JSON.stringify(auditor.getActiveMuscians()));
    conn.destroy();
});

server.listen(2205, function () {
    console.log("server listening to %j", server.address());
});
