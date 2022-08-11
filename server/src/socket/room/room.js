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

    async _message(data) {
        
        const { userId, iat, exp } = this._userInfo();

        await this.database('INSERT INTO message (room, user_id, message) VALUES (?, ?, ?)', [data.id, 1, data.msg]);

        const user = await this.database('SELECT login FROM user WHERE id = ?', [userId]);

        this.io.to(data.id).emit('new_message_in_room', {id: Math.floor((Math.random() * 1000000) + 1) , msg: data.msg, user: user[0].login});

    }

}

module.exports = Room;
