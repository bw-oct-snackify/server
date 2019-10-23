const router = require('express').Router();
const Snacks = require('./model');
const { restricted } = require('../global');

router.get('/', async (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 20;
    console.log(page);
    console.log(limit);
    try {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        let snacks = await Snacks.getSnacks(startIndex, limit);

        //Paginate results
        results = {};

        if (endIndex < (await Snacks.getSnackCount())) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        }
        results.snacks = snacks;

        res.status(200).json(results);
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
