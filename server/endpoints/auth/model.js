const knex = require('knex');
const config = require('../../../knexfile');
const b = require('bcryptjs');

const db = knex(config);

module.exports = {
    getUsers,
    addUser,
    checkEmail,
    login,
};

function getUsers() {
    return db('users');
}

async function addUser(user) {
    let { name, email, password, company_code } = user;
    password = b.hashSync(password, 12);
    let company_ID;

    //TODO: Check if the email is already associated with a company account

    //
    //If there is a company_code provided, get the company ID
    if (company_code) {
        try {
            company_ID = await db
                .select('company_ID')
                .from('companies')
                .where('company_code', company_code)
                .first();
            company_ID = company_ID.company_ID;
        } catch (e) {
            console.log('addUser: There was an error: ', e);
            Promise.resolve(false);
        }
    }
    //
    //If there is no company_code provided, create a new one
    if (!company_ID) {
        [company_ID] = await db('companies')
            .insert({})
            .returning('company_ID');
    }

    console.log(company_ID);

    return db('users')
        .insert({
            name,
            email,
            password,
            company_ID,
        })
        .returning('name');
}

async function login(user) {
    let { email, password } = user;
    console.log('User: ', user);
    let hash = await db
        .select('password')
        .from('users')
        .where({ email })
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

function checkEmail(email) {
    return db('users')
        .where('email', email)
        .first();
}
