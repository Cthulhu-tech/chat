const db = require('../utils/db/connection');

const allData_message = async (socket, id) => {

    const connection = await db();

    const all_msg = await connection.query('CALL `sp_get_all_msg`(?)', [+id]);

    socket.emit('allData_message', all_msg[0][0]);

}

module.exports = allData_message;
