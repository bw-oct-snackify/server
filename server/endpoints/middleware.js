const Auth = require('./auth/model');

module.exports = {
    registerReqs,
    registerCompanyReqs,
    takenEmail,
    restricted,
    loginReqs,
};

//
//Registration Requirements
function registerReqs(req, res, next) {
    let user = req.body;

    if (!user.name) {
        next({
            status: 409,
            message: 'Missing Name',
        });
    }

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
//Register Company Reqs
function registerCompanyReqs(req, res, next) {
    let company = req.body;
    if (!company.name) {
        next({
            status: 409,
            message: 'Missing company name',
        });
    }

    if (!company.phone) {
        next({
            status: 409,
            message: 'Missing company phone',
        });
    }

    if (!company.city) {
        next({
            status: 409,
            message: 'Missing city',
        });
    }

    if (!company.state) {
        next({
            status: 409,
            message: 'Missing State',
        });
    }

    next();
}

//
//Checks if the username has already been taken
async function takenEmail(req, res, next) {
    let user = req.body;

    let username = await Auth.checkEmail(user.email);
    console.log('Taken Email: ', username);
    if (username) {
        next({
            status: 401,
            message: {
                message: 'Email is already taken',
                user: username,
            },
        });
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
