const router = require('express').Router();
const Company = require('./model');
const {
    validCompanyID,
    updateCompanyReqs,
    checkIfCompanySnackExists,
} = require('./middleware');
const { validUserID, validSnackID } = require('../users/middleware');
const { onlyAdminAction } = require('../global');

//
//Get company info
router.get('/:company_id', validCompanyID, async (req, res, next) => {
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

//
//Update company info
router.put(
    '/:company_id',
    onlyAdminAction,
    updateCompanyReqs,
    validCompanyID,
    async (req, res, next) => {
        let company_id = req.company_id;
        let company = req.body;
        console.log('company_id: ', company_id);
        try {
            let [updatedCompany] = await Company.updateCompany(
                company_id,
                company
            );
            if (updatedCompany) {
                res.status(200).json(updatedCompany);
            }
        } catch (e) {
            next({
                status: 500,
                message: `Server error`,
            });
        }
    }
);

//
//Get company snacks that they have currently selected
router.get('/:company_id/snacks', validCompanyID, async (req, res, next) => {
    let { company_id } = req.params;
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

//
//Post company snacks to their snack inventory
router.post(
    '/:company_id/snacks/:snack_id',
    onlyAdminAction,
    validCompanyID,
    validSnackID,
    async (req, res, next) => {
        let { snack_id } = req.params;
        console.log(req.params);
        let company_id = req.company_id;
        try {
            let [snack] = await Company.addSnack(company_id, snack_id);
            res.status(200).json(snack);
        } catch (e) {
            next({
                status: 500,
                message: e,
            });
        }
    }
);

//
//Will update the quantity on the snack associated with the company
//TODO: Need to check the quantity and the value of the number
router.put(
    '/:company_id/snacks/:snack_id',
    onlyAdminAction,
    validCompanyID,
    validSnackID,
    checkIfCompanySnackExists,
    async (req, res, next) => {
        let { snack_id } = req.params;
        let company_id = req.company_id;
        let { quantity } = req.body;
        try {
            let [snack] = await Company.updateSnack(
                company_id,
                snack_id,
                quantity
            );
            res.status(200).json(snack);
        } catch (e) {
            next({
                status: 500,
                message: e,
            });
        }
    }
);

//
//Delete Company Snack
router.delete(
    '/:company_id/snacks/:snack_id',
    onlyAdminAction,
    validCompanyID,
    validSnackID,
    checkIfCompanySnackExists,
    async (req, res, next) => {
        let { snack_id } = req.params;
        console.log(snack_id);
        let company_id = req.company_id;
        try {
            let snack = await Company.deleteSnack(company_id, snack_id);
            res.status(200).json({
                status: true,
                message: `Succesfully deleted snack: ${snack_id} from user: ${company_id}`,
            });
        } catch (error) {
            next({
                status: 500,
                message: e,
            });
        }
    }
);

//
//Get companies suggested snacks
router.get(
    '/:company_id/suggestions',
    validCompanyID,
    async (req, res, next) => {
        let { company_id } = req.params;
        try {
            let suggestedSnacks = await Company.getSuggestions(company_id);
            res.status(200).json(suggestedSnacks);
        } catch (e) {
            next({
                status: 500,
                message: e,
            });
        }
    }
);

//
//Get companies users
router.get(
    '/:company_id/users',
    onlyAdminAction,
    validCompanyID,
    async (req, res, next) => {
        let company_id = req.company_id;
        try {
            let users = await Company.getUsers(company_id);
            res.status(200).json(users);
        } catch (e) {
            next({
                status: 500,
                message: e,
            });
        }
    }
);

//Delete company user
router.delete(
    '/:company_id/users/:user_id',
    onlyAdminAction,
    validUserID,
    async (req, res, next) => {
        let { user_id } = req.params;
        try {
            await Company.deleteUser(user_id);
            res.status(200).json({
                status: true,
                message: `Successfully deleted user ${user_id}`,
            });
        } catch (e) {
            next({
                status: 500,
                message: e,
            });
        }
    }
);

module.exports = router;
