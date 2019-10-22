const db = require('../../dbConfig');

module.exports = {
    getUser,
    getUserID,
    getSnackID,
    updateUser,
    addSnack,
};

//
//Get and return the userID
async function getUserID(user_ID) {
    let user = await db
        .select('user_ID')
        .from('users')
        .where({ user_ID })
        .first();
    console.log(user);
    if (user && user.user_ID) {
        return true;
    } else {
        return false;
    }
}

//
//Get and return the snack with a snack ID
async function getSnackID(snack_ID) {
    let snack = await db('snacks')
        .where({ snack_ID })
        .first();
    return snack;
}

//
//Get and return the user based on user ID
async function getUser(user_ID) {
    let user = await db
        .select(
            'u.user_ID',
            'u.company_ID',
            'c.name as company_name',
            'u.name as name',
            'email',
            'admin'
        )
        .from('users as u')
        .join('companies as c', 'c.company_ID', 'u.company_ID')
        .where({ user_ID })
        .first();
    let snacks = await db
        .select('s.name', 's.brand', 's.uom', 's.img_url')
        .from('user_snacks as us')
        .join('snacks as s', 's.snack_ID', 'us.snack_ID')
        .where({ user_ID });

    return {
        ...user,
        snacks,
    };
}

//
//Update the user
async function updateUser(user_ID, info) {
    let { name, email, img_url = null } = info;
    return db('users')
        .returning([
            'user_ID',
            'company_ID',
            'name',
            'email',
            'admin',
            'img_url',
        ])
        .where({ user_ID })
        .update({ name, email, img_url });
}

//
//Add a snack association to the user
async function addSnack(user_ID, snack_ID) {
    let record = await db('user_snacks')
        .where({ user_ID })
        .andWhere({ snack_ID });
    if (record) {
        Promise();
    }
    return db('user_snacks')
        .returning('*')
        .insert({
            user_ID,
            snack_ID,
        })
        .whereNotExists(db('user_snacks').where({ user_ID, snack_ID }));
}
