module.exports = {
    restricted,
    onlyAdminAction,
};

//
//Checks if the user is logged in
async function restricted(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        next({
            status: 401,
            message: 'Not logged in. Please do so',
        });
    }
}

async function onlyAdminAction(req, res, next) {
    let { company_id } = req.params;
    console.log(req.session.user);
    if (
        req.session.user.company_ID == company_id &&
        req.session.user.admin == true
    ) {
        //
        //if the user is within the same company as the url and is the admin
        //then continue, and just attach the company id to the req itself
        req.company_id = company_id;
        next();
    } else {
        next({
            status: 403,
            message:
                "You're trying to get / alter a company that is not yours. Naughty. Naughty.",
        });
    }
}
