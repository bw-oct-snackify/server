const router = require('express').Router();
const Snacks = require('./model');

router.get('/', async (req, res, next) => {
    try {
        let snacks = await Snacks.getSnacks();
        res.status(200).json(snacks);
    } catch (e) {
        next({
            status: 500,
            message: 'Server Errror retreiving snacks... please try again',
        });
    }
});

module.exports = router;
