const router = require('express').Router();
const Users = require('../auth/model');

router.get('/users', async (req, res) => {
    let users = await Users.getUsers();
    res.status(200).json(users);
});

module.exports = router;
