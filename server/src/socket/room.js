const room = (room, socket, io) => {

    socket.join(room);
    
    console.log('leave', socket.rooms, 'count', io.engine.clientsCount);

    socket.on('room_message', (data) => {
        console.log('1')
        io.to(data.id).emit('new_message_in_room', data.msg);

    });

}

module.exports = room;
