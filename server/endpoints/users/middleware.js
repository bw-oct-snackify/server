const User = require('./model');

module.exports = {
    validUserID,
    onlyUserAction,
    userReqs,
    validSnackID,
};

//
//Checks if the
async function validUserID(req, res, next) {
    let { user_id } = req.params;
    let userID = await User.getUserID(user_id);
    console.log(userID);
    if (userID) {
        next();
    } else {
        next({
            status: 404,
            message: 'No user with that ID',
        });
    }
}

//
//Checks to ensure the request is only for the user that is currently logged in
async function onlyUserAction(req, res, next) {
    let { user_id } = req.params;
    if (req.session.user.user_ID == user_id) {
        next();
    } else {
        next({
            status: 403,
            message:
                "You're trying to get / alter a user that is not you. Naughty. Naughty.",
        });
    }
}

//
//Checks for user put requirements to update user info
function userReqs(req, res, next) {
    let user = req.body;

    if (!user.name) {
        next({
            status: 409,
            message: 'Missing Name',
        });
    }

    if (!user.email) {
        next({
            status: 409,
            message: 'Missing Email',
        });
    }

    next();
}

//
//Checks to make sure the snack exists
async function validSnackID(req, res, next) {
    let { snack_id } = req.params;
    let snack = await User.getSnackID(snack_id);
    if (snack) {
        next();
    } else {
        next({
            status: 404,
            message: 'No snack with that ID exists',
        });
    }
}
