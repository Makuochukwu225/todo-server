const socketIO = require('socket.io');

let io;

function init(server) {
    io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
}

function getIO() {
    if (!io) {
        throw new Error('IO not initialized');
    }
    return io;
}

module.exports = {
    init,
    getIO,
};