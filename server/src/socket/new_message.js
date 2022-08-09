const data_message = async (msg, io) => {

    io.emit('new_message', "its`s new message");

}

module.exports = data_message;
