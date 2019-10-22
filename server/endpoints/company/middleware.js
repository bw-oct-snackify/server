const Company = require('./model');
module.exports = {
    validCompanyID,
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
