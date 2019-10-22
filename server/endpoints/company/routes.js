const router = require('express').Router();
const Company = require('./model');
const { validCompanyID, onlyAdminAction } = require('./middleware');

router.get('/:company_id', onlyAdminAction, async (req, res, next) => {
    let { company_id } = req.params;
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
