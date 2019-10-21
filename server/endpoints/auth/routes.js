const router = require('express').Router();
const Auth = require('./model');
const {
    registerReqs,
    takenEmail,
    registerCompanyReqs,
    loginReqs,
} = require('../middleware');

//
//Registration of user
router.post('/register', registerReqs, takenEmail, async (req, res, next) => {
    let user = req.body;
    try {
        let [createdUser] = await Auth.addUser(user);
        res.status(200).json(createdUser);
        req.session.user = user;
    } catch (e) {
        console.log('Register Route: There was an error: ', e);
    }
});

//
//Registration of a new company
router.post(
    '/register/company',
    registerCompanyReqs,
    async (req, res, next) => {
        let company = req.body;
        try {
            let [createdCompany] = await Auth.addCompany(company);
            if (createdCompany) {
                res.status(200).json(createdCompany);
            }
        } catch (e) {
            next({
                status: 500,
                message: `Server error`,
            });
        }
    }
);

//
//Login
router.post('/login', loginReqs, async (req, res, next) => {
    let login = req.body; //
    console.log(login);

    let user = await Auth.login(login);
    console.log(user);

    if (user && user.email) {
        delete user.password;
        req.session.user = user.user_ID;
        res.status(200).json(user);
    } else {
        next({
            status: 401,
            message:
                'You shall not pass! Unauthorized, Email or Password incorrect',
        });
    }
});

//
//Logout
router.get('/logout', async (req, res, next) => {
    if (req.session) {
        try {
            let destroyed = await req.session.destroy();
            res.status(200).json({
                message: 'Successfully logged out. Thanks for playing!',
            });
        } catch (e) {
            res.status(400).json('Failed to logout. Please try again.');
        }
    } else {
        res.status(200).json({ message: 'You were never here to begin with.' });
    }
});

//module.exports = { router, restricted: restricted };
module.exports = router;
