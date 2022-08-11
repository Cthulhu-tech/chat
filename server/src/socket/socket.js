const { verify } = require('jsonwebtoken');

class Socket {

    constructor(io){

        this.io = io;

    }

    _verify() {

      this.io.use((socket, next) => {

        try {
            
          verify(socket.handshake.auth.jwt, process.env.ACCESS_TOKEN_SECRET);
      
          return next();
      
        }catch (e){
      
          console.log(socket.handshake.auth.jwt);
      
        }
      
      });

    }

}

module.exports = Socket;
