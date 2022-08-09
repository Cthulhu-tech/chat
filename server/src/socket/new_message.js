const data_message = async (msg, socket) => {

    socket.emit('new_message', "its`s new message");

}

module.exports = data_message;
