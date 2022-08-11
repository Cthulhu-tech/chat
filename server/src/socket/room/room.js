const Socket = require("../socket");

class Room extends Socket{

    constructor(io) {

        super(io);

    }

    _handlerRoom(socket) {

        this.socket = socket;

        socket.on('join', (room) => this._join(room));
        socket.on('leave', (room) => this._leave(room));
        socket.on('room_message', (data) => this._message(data));

    }

    _join(room) {

        this.socket.join(room);

    }

    _leave(room) {

        this.socket.leave(room);

    }

    _message(data) {

        this.io.to(data.id).emit('new_message_in_room', data.msg);

    }

}

module.exports = Room;
