const { verify } = require('jsonwebtoken');

class Socket {

    constructor(io){

        this.io = io;

    }

    connection() {

        this.io.use((socket, next) => {

            try {
                
              verify(socket.handshake.auth.jwt, process.env.ACCESS_TOKEN_SECRET);
          
              next();
          
            }catch (e){
          
              console.log(socket.handshake.auth.jwt);
          
            }
          
        });
          
        this.io.on('connection', (socket) => {
        
            socket.on('disconnect', () => socket.disconnect(0));
            socket.on("room", (msg) => require('./room')(msg, socket));
            socket.on("message", (msg) => require('./message')(msg, socket));

            socket.on('create', (room) => {
                
                socket.join(room);
                socket.on('new_message_in_room', () => {

                    console.log('f')

                })
            
            });
            
            socket.on('allData_room', () => require('./allData_room')(socket, this.io));
            socket.on('allData_message', () => require('./allData_message')(socket));
            
            socket.on('new_room', (msg) => require('./new_room')(msg, socket, this.io));
            socket.on('new_message', (msg) => require('./new_message')(msg, this.io));
            
            socket.on('delete_room', (msg) => require('./delete_room')(msg, socket));
            socket.on('delete_message', (msg) => require('./delete_message')(msg, socket));
        
        });          

    }

}

module.exports = Socket;
