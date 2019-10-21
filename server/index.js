const express = require('express');

//
//middleware
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const { restricted } = require('./endpoints/middleware');

//
//Configs
const knexConfig = require('./dbConfig');
const sessionConfig = {
    name: 'session',
    secret: process.env.SESSION_SECRET || 'LaMbDaIsDaBoMb',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: knexConfig,
        createtable: true,
        clearInterval: 1000 * 60 * 60,
    }),
};

//
//Routers
const authRoutes = require('./endpoints/auth/routes');
const usersRoutes = require('./endpoints/users/routes');

//
//Create App
const server = express();

//
//Use middleware
server.use(express.json());
server.use(helmet());
//TODO: Add multiple acceptable origins
server.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);
server.use(morgan('tiny'));
server.use(session(sessionConfig));

//
//Basic route
server.get('/', (req, res) => {
    res.send('Inside server!');
});

//
//Use middleware
server.use('/users', restricted, usersRoutes);
server.use('/auth', authRoutes);

//
//error handler
server.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status).json(err.message);
});

module.exports = server;
