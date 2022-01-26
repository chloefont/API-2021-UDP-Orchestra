const instruments = require("../shared/instruments");
const protocol = require("../shared/protocol");
const { v4: uuidv4 } = require('uuid');


class Musician {
    instrument;
    id = uuidv4();
    interval;

    constructor(instrument) {
        this.instrument = instrument;
    }

    play(socket) {
        const payload = JSON.stringify({
            uuid: this.id,
            sound: instruments[this.instrument],
        });

         this.interval = setInterval(()=>{
            socket.send(payload, 0, payload.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, function(err, bytes) {
                console.log("Sending payload: " + payload + " via port " + socket.address().port);
            });
        }, 1000)
    }

    stopPlaying() {
        clearInterval(this.interval);
    }

}
module.exports = Musician;