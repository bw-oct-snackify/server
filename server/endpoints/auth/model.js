const b = require('bcryptjs');
const db = require('../../dbConfig');

let User = require('../users/model');

module.exports = {
    getUsers,
    addUser,
    addCompany,
    checkEmail,
    checkCompany,
    login,
};

function getUsers() {
    return db('users');
}

async function addUser(user) {
    let { name, email, password, company_code } = user;
    password = b.hashSync(password, 12);
    let company_ID;
    let admin = false;

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
            if (company_ID == undefined) {
                return Promise.resolve([false]);
            } else {
                company_ID = company_ID.company_ID;
            }
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
        admin = true;
    }

    console.log(company_ID);

    return db('users')
        .returning([
            'name',
            'email',
            'img_url',
            'company_ID',
            'user_ID',
            'admin',
        ])
        .insert({
            name,
            email,
            password,
            company_ID,
            admin,
        });
}

//
//create a new company
function addCompany(company_ID, company) {
    let { name, phone, city, state, package_ID = null } = company;

    console.log(company);
    //
    //Create Company Code
    let random = Math.round(Math.random() * 10000);
    let company_code = name.toLowerCase().split(' ');
    company_code.push('snackify');
    company_code.push(random.toString());
    company_code = company_code.join('-');

    console.log(company_code);

    return db('companies')
        .returning('*')
        .update({
            name,
            company_code,
            phone,
            city,
            state,
            package_ID,
        })
        .where({ company_ID });
}

async function login(login) {
    let { email, password } = login;
    console.log('User: ', login);
    let check = await db
        .select('user_ID', 'email', 'password')
        .from('users')
        .join('companies', 'users.company_ID', 'companies.company_ID')
        .where({ email })
        .first();

    if (!check) {
        return Promise.resolve(false);
    }

    let match = b.compareSync(password, check.password);

    if (match) {
        let user = await User.getUser(check.user_ID);
        return Promise.resolve(user);
    }

    return Promise.resolve(false);
}

function checkEmail(email) {
    return db('users')
        .select(
            'users.name',
            'email',
            'companies.name as company_name',
            'company_code'
        )
        .where('email', email)
        .join('companies', 'users.company_ID', 'companies.company_ID')
        .first();
}

function checkCompany(company_ID) {
    return db('companies')
        .where({ company_ID })
        .first();
}
