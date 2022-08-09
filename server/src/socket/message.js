const message = (msg, socket) => {

    console.log(msg, 'message');

    socket.emit('update_message');

}

module.exports = message;
