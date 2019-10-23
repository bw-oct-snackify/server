const router = require('express').Router();
const Snacks = require('./model');
const { restricted } = require('../global');

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

router.post('/', async (req, res, next) => {
    let snacks = req.body;
    try {
        let addedSnacks = Snacks.addSnacks(snacks.snacks);
        res.status(200).json(addedSnacks);
    } catch (e) {
        next({
            status: 500,
            message: 'Failed to add snacks',
        });
    }
});

module.exports = router;
