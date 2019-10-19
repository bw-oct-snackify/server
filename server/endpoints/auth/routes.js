const router = require('express').Router();
const Users = require('./model');
const { registerReqs, takenUsername, loginReqs } = require('../middleware');

//
//Registration
router.post(
    '/register',
    registerReqs,
    takenUsername,
    async (req, res, next) => {
        let user = req.body;
        req.session.user = user;
        let createdUser = await Users.addUser(user);
        res.status(200).json(createdUser);
    }
);

//
//Login
router.post('/login', loginReqs, async (req, res, next) => {
    let user = req.body; //
    console.log(user);
    let loggedIn = await Users.login(user);
    console.log(loggedIn);
    if (loggedIn) {
        req.session.user = user;
        res.status(200).json({ message: 'Youre logged in' });
    } else {
        next({
            status: 401,
            message:
                'You shall not pass! Unauthorized, username or password incorrect',
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
