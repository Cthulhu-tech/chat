const ServerStart = (app) => {
    
    const http = require('http').Server(app);
    
    const port = process.env.PORT || 4000;

    http.listen(port, () => {

        console.log(`Socket.IO server running at :${port}`);

    });

    return require('socket.io')(http, {

        cors: {

            origin: process.env.ORIGIN,

        }

    });

}

module.exports = ServerStart;
