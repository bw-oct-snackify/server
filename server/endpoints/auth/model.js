const b = require('bcryptjs');
const db = require('../../dbConfig');

module.exports = {
    getUsers,
    addUser,
    addCompany,
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
            .returning('company_ID')
            .insert({});
    }

    console.log(company_ID);

    return db('users')
        .returning('name')
        .insert({
            name,
            email,
            password,
            company_ID,
        });
}

function addCompany(company) {
    let { name, phone, city, state } = company;
    return db('companies')
        .returning(['company_ID', 'name', 'phone', 'city', 'state'])
        .insert({
            name,
            phone,
            city,
            state,
        });
}

async function login(user) {
    let { email, password } = user;
    console.log('User: ', user);
    let hash = await db
        .select('user_ID', 'name', 'email', 'password')
        .from('users')
        .where({ email })
        .first();

    //
    //If there is not a password at all
    console.log(hash);
    if (!hash) {
        return Promise.resolve(false);
    }

    let match = b.compareSync(password, hash.password);

    if (match) {
        return Promise.resolve(hash);
    }

    return Promise.resolve(false);
}

function checkEmail(email) {
    return db('users')
        .where('email', email)
        .first();
}
