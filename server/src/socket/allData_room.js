const db = require('../utils/db/connection');

const allData_room = async (io) => {

    const connection = await db();

    const room = await connection.query('CALL `sp_get_all_room`()');

    connection.end();

    io.emit('allData_room', room[0][0]);

}

module.exports = allData_room;
