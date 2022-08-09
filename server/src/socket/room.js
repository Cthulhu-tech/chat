const room = (msg, socket) => {

    console.log(msg, 'room');

    socket.emit('update_room');

}

module.exports = room;
