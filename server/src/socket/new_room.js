const allData_room = require('./allData_room');
const db = require('../utils/db/connection');
const { verify } = require('jsonwebtoken');

const data_room = async (msg, socket, io) => {

    try{

        const {userId} = await verify(socket.handshake.auth.jwt, process.env.ACCESS_TOKEN_SECRET);

        const connection = await db();

        await connection.query('CALL `sp_set_new_room`(?, ?)', [msg, userId]);
    
        connection.end();
    
        allData_room(socket, io);


    }catch(err){

        console.log(err);

    }

}

module.exports = data_room;
