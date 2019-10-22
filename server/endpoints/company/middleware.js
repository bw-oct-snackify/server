const Company = require('./model');
module.exports = {
    validCompanyID,
    updateCompanyReqs,
    checkIfCompanySnackExists,
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

async function checkIfCompanySnackExists(req, res, next) {
    let { snack_id } = req.params;
    let company_id = req.company_id;
    try {
        let company_snack = await Company.validSnackRequest(
            company_id,
            snack_id
        );
        if (company_snack) {
            next();
        }
    } catch (error) {
        next({
            status: 404,
            message: "Your company doens't have that snack associated",
        });
    }
}
