const cookieParser = require('cookie-parser');
const ServerStart = require('./src/server');
const bodyParser = require('body-parser');
const {verify}  = require('jsonwebtoken');
const express = require('express');
require('dotenv').config();
const app = express();

const io = ServerStart(app);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => require('./src/api/post/login')(req, res));
app.post('/regist', (req, res) => require('./src/api/post/registration')(req, res));
app.post('/lagout', (req, res) => require('./src/api/post/lagout')(req, res));
app.post('/refresh', (req, res) => require('./src/api/post/refresh')(req, res));

io.use((socket, next) => {

  try {
      
    verify(socket.handshake.auth.jwt, process.env.ACCESS_TOKEN_SECRET);

    next();

  }catch (e){

    console.log(socket.handshake.auth.jwt)

  }

});

io.on('connection', (socket) => {
  console.log('connection')
  socket.on("message", msg => {

    console.log(msg);

  });

});