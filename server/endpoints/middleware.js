const Users = require('./auth/model');

module.exports = {
    registerReqs,
    takenUsername,
    restricted,
    loginReqs,
};

//
//Registration Requirements
function registerReqs(req, res, next) {
    let user = req.body;

    if (!user.username) {
        next({
            status: 409,
            message: 'Missing Username',
        });
    }
    // if(!user.email){
    // 	next({
    // 		status: 409,
    // 		message: 'Missing Email'
    // 	})
    // }
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
async function takenUsername(req, res, next) {
    let user = req.body;

    let username = await Users.checkUsername(user.username);
    if (username) {
        next({ status: 401, message: 'Username is already taken' });
    }
    next();
}

//
//Checks if Login has username and password in body
function loginReqs(req, res, next) {
    let login = req.body;

    if (!login.username) {
        next({
            status: 409,
            message: 'Missing username',
        });
    }

    if (!login.password) {
        next({
            status: 409,
            message: 'Missing Password',
        });
    }

    // if (!login.email) {
    // 	next({
    // 		status: 409,
    // 		message: 'Missing Emai'
    // 	})
    // }
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
