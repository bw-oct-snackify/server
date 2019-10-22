const Company = require('./model');
module.exports = {
    validCompanyID,
    onlyAdminAction,
};

async function validCompanyID(req, res, next) {
    let { company_id } = req.params;
    let [company] = await Company.getCompanyInfo(company_id);
    if (company && company.name) {
        next();
    } else {
        next({
            status: 404,
            message: 'No company with that ID exists',
        });
    }
}

async function onlyAdminAction(req, res, next) {
    let { company_id } = req.params;
    if (req.session.user.company_ID == company_id) {
        next();
    } else {
        next({
            status: 403,
            message:
                "You're trying to get / alter a user that is not you. Naughty. Naughty.",
        });
    }
}
