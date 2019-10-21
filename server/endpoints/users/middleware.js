const User = require('./model');

module.exports = {
    validUserID,
    onlyUserAction,
    userReqs,
};

//
//Checks if the
async function validUserID(req, res, next) {
    let { id } = req.params;
    let userID = await User.getUserID(id);
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

async function onlyUserAction(req, res, next) {
    let { id } = req.params;
    if (req.session.user == id) {
        next();
    } else {
        next({
            status: 403,
            message:
                "You're trying to alter a user that is not you. Naughty naughty",
        });
    }
}

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
