const ServerStart = (app) => {
    
    const http = require('http').Server(app);
    
    app.use(require('cors')({origin: process.env.ORIGIN, credentials: true, optionSuccessStatus: 204, headers: "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization"}));
    
    const port = process.env.PORT || 4000;

    http.listen(port, () => {

        console.log(`Socket.IO server running at :${port}`);

    });

    return require('socket.io')(http, {

        cors: {

            origin: process.env.ORIGIN,
            methods: ["GET", "POST"]

        }

    });

}

module.exports = ServerStart;
