const router = require('express').Router();
const Packages = require('./model');

router.get('/', async (req, res, next) => {
    try {
        let packages = await Packages.getPackages();
        res.status(200).json(packages);
    } catch (e) {
        next({
            status: 500,
            message: 'Server Errror retreiving packages... please try again',
        });
    }
});

module.exports = router;
