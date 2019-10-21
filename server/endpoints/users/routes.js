const router = require('express').Router();
const User = require('./model');
const { validUserID, onlyUserAction, userReqs } = require('./middleware');

router.get('/:id', validUserID, async (req, res) => {
    let { id } = req.params;
    let user = await User.getUser(id);
    res.status(200).json(user);
});

router.put(
    '/:id',
    validUserID,
    onlyUserAction,
    userReqs,
    async (req, res, next) => {
        let { id } = req.params;
        let info = req.body;
        try {
            let [updated] = await User.updateUser(id, info);
            res.status(200).json(updated);
        } catch (e) {
            next({
                status: 500,
                message: 'Failed to update user... try again later',
            });
        }
    }
);

module.exports = router;
