const Room = require("../room/room");

class Connection extends Room {

    constructor(io) {

        super(io);

    }

    connection = () => {
          
        this.io.on('connection', (socket) => {

            this._verify();
            this._handlerRoom(socket);
            this._handlerConnection(socket);
        
        });        
    
    }

    _handlerConnection(socket) {

        socket.use((packet, next) => this._checkConnection(packet, next));

        socket.on('disconnect', () => socket.disconnect(0));
        socket.on("message", (msg) => require('../message')(msg, socket));
        
        socket.on('allData_room', () => require('../allData_room')(socket, this.io));
        socket.on('allData_message', (id) => require('../allData_message')(socket, id));
        
        socket.on('new_room', (msg) => require('../new_room')(msg, socket, this.io));
        
        socket.on('delete_room', (msg) => require('../delete_room')(msg, socket));
        socket.on('delete_message', (msg) => require('../delete_message')(msg, socket));

    }

}

module.exports = Connection;
