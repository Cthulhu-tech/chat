const db = require('../utils/db/connection');
const { verify } = require('jsonwebtoken');

class Socket {

    constructor(io){

        this.io = io;

    }

    _jwtUpdate(packet) {

      this.socket.emit('update_jwt', packet);

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
        console.log(this.io.engine.clientsCount)
        try {
            
          verify(socket.handshake.auth.jwt, process.env.ACCESS_TOKEN_SECRET);
      
          return next();
      
        }catch (e){
      
          socket.disconnect(0);
      
        }
      
      });

    }

    async database (query, params = []) {

      const connection = await db();

      const data = await connection.query(query, params);

      connection.end();

      return data[0];

    }

    async _checkConnection(packet, next) {

      try{
        
        await verify(this.socket.handshake.auth.jwt, process.env.ACCESS_TOKEN_SECRET);

        next();

      }catch(e){

        this._jwtUpdate(packet);

        this.socket.disconnect(0);

      }

    }

}

module.exports = Socket;
