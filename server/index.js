const ServerStart = require('./src/server');
const app = require('express')();
require('dotenv').config();

const io = ServerStart(app);

app.get('/', (req, res) => {

  res.end('work');

});

io.use((socket, next) => {
  
  console.log(...socket)
  next();
  
});

io.on('connection', (socket) => {

  socket.on("message", msg => {

    console.log(msg);

  });

});