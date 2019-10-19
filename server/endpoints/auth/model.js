const knex = require('knex');
const config = require('../../../knexfile');
const b = require('bcryptjs');

const db = knex(config);

module.exports = {
    getUsers,
    addUser,
    checkUsername,
    login,
};

function getUsers() {
    return db('users');
}

function addUser(user) {
    let { username, password } = user;
    password = b.hashSync(password, 12);

    return db('users')
        .insert({
            username,
            password,
        })
        .returning('user_id', 'username');
}

async function login(user) {
    let { username, password } = user;
    console.log('User: ', user);
    let hash = await db
        .select('password')
        .from('users')
        .where({ username })
        .first();

    console.log(hash);
    if (!hash) {
        return Promise.resolve(false);
    }

    let match = b.compareSync(password, hash.password);

    if (match) {
        return Promise.resolve(true);
    }

    return Promise.resolve(false);
}

function checkUsername(username) {
    return db('users')
        .where('username', username)
        .first();
}
