const Company = require('./model');
module.exports = {
    validCompanyID,
    updateCompanyReqs,
};

async function validCompanyID(req, res, next) {
    let company_id = req.company_id;
    let company = await Company.getCompanyInfo(company_id);
    if (company && company.name) {
        next();
    } else {
        next({
            status: 404,
            message: 'No company with that ID exists',
        });
    }
}

function updateCompanyReqs(req, res, next) {
    let company = req.body;

    if (!company.name) {
        next({
            status: 409,
            message: 'Missing company name',
        });
    }

    if (!company.phone) {
        next({
            status: 409,
            message: 'Missing company phone',
        });
    }

    if (!company.city) {
        next({
            status: 409,
            message: 'Missing city',
        });
    }

    if (!company.state) {
        next({
            status: 409,
            message: 'Missing State',
        });
    }

    if (!company.package_ID) {
        next({
            status: 409,
            message: 'Missing Package ID',
        });
    }

    next();
}
