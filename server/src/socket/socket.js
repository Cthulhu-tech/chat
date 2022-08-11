const db = require('../utils/db/connection');
const { verify } = require('jsonwebtoken');

class Socket {

    constructor(io){

        this.io = io;

    }

    _userInfo() {

      try {

        return verify(this.socket.handshake.auth.jwt, process.env.ACCESS_TOKEN_SECRET);

      }catch(e){

        return null;

      }

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

    async database (query, params = []) {

      const connection = await db();

      const data = await connection.query(query, params);

      connection.end();

      return data[0];

    }

}

module.exports = Socket;
