const db = require('../../dbConfig');

module.exports = {
    getUser,
    getUserID,
};

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
