module.exports = {
    restricted,
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
