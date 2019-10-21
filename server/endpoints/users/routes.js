const router = require('express').Router();
const User = require('./model');
const { validUserID } = require('./middleware');

router.get('/:id', validUserID, async (req, res) => {
    let { id } = req.params;
    let user = await User.getUser(id);
    res.status(200).json(user);
});

module.exports = router;
