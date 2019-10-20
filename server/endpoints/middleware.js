const Users = require('./auth/model');

module.exports = {
    registerReqs,
    takenEmail,
    restricted,
    loginReqs,
};

//
//Registration Requirements
function registerReqs(req, res, next) {
    let user = req.body;

    if (!user.email) {
        next({
            status: 409,
            message: 'Missing Email',
        });
    }
    if (!user.password) {
        next({
            status: 409,
            message: 'Missing Password',
        });
    }

    if (user.password.length < 8) {
        next({
            status: 409,
            message: 'Password must be at least 8 chars',
        });
    }

    next();
}

//
//Checks if the username has already been taken
async function takenEmail(req, res, next) {
    let user = req.body;

    let username = await Users.checkEmail(user.email);
    if (username) {
        next({ status: 401, message: 'Email is already used' });
    }
    next();
}

//
//Checks if Login has username and password in body
function loginReqs(req, res, next) {
    let login = req.body;

    if (!login.email) {
        next({
            status: 409,
            message: 'Missing Email',
        });
    }

    if (!login.password) {
        next({
            status: 409,
            message: 'Missing Password',
        });
    }
    next();
}

//
//Checks if the user is logged in
async function restricted(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        next({
            status: 401,
            message: 'Not logged in. Please do so',
        });
    }
}
