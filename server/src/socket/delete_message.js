const db = require('../utils/db/connection');

const delete_message = async (msg, socket) => {

    socket.emit('delete_message', "its`s message delete");

}

module.exports = delete_message;
