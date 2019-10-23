const router = require('express').Router();
const Auth = require('./model');
const {
    registerReqs,
    takenEmail,
    registerCompanyReqs,
    loginReqs,
    validCompanyID,
} = require('./middleware');

//
//Registration of user
router.post('/register', registerReqs, takenEmail, async (req, res, next) => {
    let user = req.body;
    try {
        let [createdUser] = await Auth.addUser(user);
        if (createdUser == false) {
            next({
                status: 404,
                message: "That company code doesn't exist...",
            });
        } else {
            req.session.user = createdUser;
            res.status(200).json(createdUser);
            console.log('Created user: ', createdUser);
        }
    } catch (e) {
        console.log('Register Route: There was an error: ', e);
    }
});

//
//Registration of a new company
router.put(
    '/register/company/:id',
    registerCompanyReqs,
    validCompanyID,
    async (req, res, next) => {
        let { id } = req.params;
        let company = req.body;
        try {
            let [createdCompany] = await Auth.addCompany(id, company);
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
        req.session.user = user;
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
