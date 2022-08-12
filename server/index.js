const Connection = require('./src/socket/connection/connection');
const cookieParser = require('cookie-parser');
const ServerStart = require('./src/server');
const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(require('cors')({origin: process.env.ORIGIN, credentials: true, optionSuccessStatus: 200, headers: "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization"}));

app.post('/login', (req, res) => require('./src/api/post/login')(req, res));
app.post('/lagout', (req, res) => require('./src/api/post/lagout')(req, res));
app.post('/refresh', (req, res) => require('./src/api/post/refresh')(req, res));
app.post('/regist', (req, res) => require('./src/api/post/registration')(req, res));

const io = ServerStart(app);

new Connection(io).connection();
