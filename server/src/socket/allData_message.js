const allData_message = async (socket) => {

    socket.emit('allData_message', "get you all data in message");

}

module.exports = allData_message;
