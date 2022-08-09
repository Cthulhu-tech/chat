const db = require('../utils/db/connection');

const delete_room = async (msg, socket) => {

    socket.emit('delete_room', "its`s room delete");

}

module.exports = delete_room;
