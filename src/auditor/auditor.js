const instruments = require("../shared/instruments");
const protocol = require("../shared/protocol");

class Auditor {
    musicians;
    socket;

    constructor(socket) {
        this.socket = socket;
        this.musicians = [];

        this.socket.bind(protocol.PROTOCOL_PORT, () => {
            console.log("Joining multicast group");
            this.socket.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
        });

        //setInterval(() => this.checkActiveMusicians(), protocol.PROTOCOL_MUSICIAN_TIMEOUT);
    }

    listen() {
        this.socket.on("message", (msg, source) => {
            const message = JSON.parse(msg);

            const index = this.musicians.findIndex((current) => current.uuid == message.uuid);

            if (index == -1) {
                const musician = {
                    uuid: message.uuid,
                    instrument: Object.entries(instruments).find((current) => {
                        return current[1] == message.sound;
                    })[0],
                    activeSince: new Date().toISOString(),
                    lastTimeActive: Date.now(),
                };

                this.musicians.push(musician);
            } else {
                this.musicians[index].lastTimeActive = Date.now();
            }
            console.log(this.musicians);
        });
    }

    removeInactiveMusicians() {
        const now = Date.now();
        this.musicians = this.musicians.filter((musician) => {
            return musician.lastTimeActive + protocol.PROTOCOL_MUSICIAN_TIMEOUT > now;
        });
    }

    getActiveMuscians() {
        return this.musicians.map((musician) => {
            return {
                uuid: musician.uuid,
                instrument: musician.instrument,
                activeSince: musician.activeSince,
            };
        });
    }
}

module.exports = Auditor;
