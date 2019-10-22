const router = require('express').Router();
const Company = require('./model');
const { validCompanyID } = require('./middleware');

router.get('/', async (req, res, next) => {
    let company_id = req.company_id;

    try {
        let company_info = await Company.getCompanyInfo(company_id);
        res.status(200).json(company_info);
    } catch (e) {
        next({
            status: 404,
            message: 'No company with that ID exists',
        });
    }
});

module.exports = router;
