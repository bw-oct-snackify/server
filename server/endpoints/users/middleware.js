const User = require('./model');

module.exports = {
    validUserID,
};

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
