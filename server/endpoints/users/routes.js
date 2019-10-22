const router = require('express').Router();
const User = require('./model');
const {
    validUserID,
    onlyUserAction,
    userReqs,
    validSnackID,
} = require('./middleware');

//
//Get User Info
router.get('/:id', validUserID, async (req, res, next) => {
    try {
        let { id } = req.params;
        let user = await User.getUser(id);
        res.status(200).json(user);
    } catch (e) {
        next({
            status: 500,
            message: "Server poo'ed... try again.",
        });
    }
});

//
//Update User info based on user_ID
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

//
//POST User snacks to associate a user and the snacks they want as suggestions
router.post(
    '/:user_id/snacks/:snack_id',
    validUserID,
    validSnackID,
    async (req, res, next) => {
        let { user_id, snack_id } = req.params;
        try {
            let snack = await User.addSnack(user_id, snack_id);
            res.status(200).json(snack);
        } catch (e) {
            next({
                status: 500,
                message: 'Server failed to add snack... so sorry :/ ',
            });
        }
    }
);

module.exports = router;
