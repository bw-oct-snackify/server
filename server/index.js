const express = require('express');

//
//middleware
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const { restricted } = require('./endpoints/global');

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
        clearInterval: 1000 * 60 * 60 * 24,
    }),
};

//
//Routers
const authRoutes = require('./endpoints/auth/routes');
const snackRoutes = require('./endpoints/snacks/routes');
const packageRoutes = require('./endpoints/packages/routes');
const userRoutes = require('./endpoints/users/routes');
const companyRoutes = require('./endpoints/company/routes');
const billingRoutes = require('./endpoints/billing/routes');

//
//Create App
const server = express();

//
//Use middleware
server.use(express.json());
server.use(helmet());
//TODO: Add multiple acceptable origins
var whitelist = [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://snackify.netlify.com',
];
var corsOptions = {
    credentials: true,
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (whitelist.indexOf(origin) === -1) {
            return callback(new Error('Not allowed by CORS'));
        }
        return callback(null, true);
    },
};
server.use(cors(corsOptions));
server.use(morgan('tiny'));
server.use(session(sessionConfig));

//
//Basic route
server.get('/', (req, res) => {
    res.send('Inside server!');
});

//
//Use middleware
server.use('/users', restricted, userRoutes);
server.use('/auth', authRoutes);
server.use('/snacks', snackRoutes);
server.use('/packages', packageRoutes);
server.use('/company', restricted, companyRoutes);
server.use('/billing', restricted, billingRoutes);

//
//error handler
server.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status).json(err.message);
});

module.exports = server;
