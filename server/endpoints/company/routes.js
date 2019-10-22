const router = require('express').Router();
const Company = require('./model');
const { validCompanyID, updateCompanyReqs } = require('./middleware');

//
//Get company info
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

//
//Update company info
router.put('/', updateCompanyReqs, validCompanyID, async (req, res, next) => {
    let company_id = req.company_id;
    let company = req.body;
    console.log('company_id: ', company_id);
    try {
        let [updatedCompany] = await Company.updateCompany(company_id, company);
        if (updatedCompany) {
            res.status(200).json(updatedCompany);
        }
    } catch (e) {
        next({
            status: 500,
            message: `Server error`,
        });
    }
});

//
//Get company snacks that they have currently selected
router.get('/snacks', validCompanyID, async (req, res, next) => {
    let company_id = req.company_id;
    try {
        let snacks = await Company.getSnacks(company_id);
        res.status(200).json(snacks);
    } catch (e) {
        next({
            status: 500,
            message: e,
        });
    }
});

module.exports = router;
