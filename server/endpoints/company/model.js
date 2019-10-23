const db = require('../../dbConfig');
const { mapUsersToSnacks, mapSnacksToUsers } = require('./utils');

module.exports = {
    getCompanyInfo,
    updateCompany,
    getSnacks,
    addSnack,
    validSnackRequest,
    updateSnack,
    deleteSnack,
    getSuggestions,
    getUsers,
    deleteUser,
};

function getCompanyInfo(company_ID) {
    return db
        .select('c.*', 'p.price')
        .from('companies as c')
        .where({ 'c.company_ID': company_ID })
        .join('packages as p', 'p.package_ID', 'c.package_ID')
        .first();
}

function updateCompany(company_ID, company) {
    let { name, phone, city, state, package_ID } = company;

    return db('companies')
        .returning('*')
        .update({
            name,
            phone,
            city,
            state,
            package_ID,
        })
        .where({ company_ID });
}

async function getSnacks(company_ID) {
    console.log(company_ID);
    let company = await db
        .select('name')
        .from('companies')
        .where({ company_ID })
        .first();
    let snacks = await db
        .select('s.name', 's.brand', 's.uom', 's.img_url', 'cs.quantity')
        .from('snacks as s')
        .join('company_snacks as cs', 'cs.snack_ID', 's.snack_ID')
        .where('cs.company_ID', company_ID);
    return {
        ...company,
        snacks,
    };
}

//
//Add a snack association to the company
async function addSnack(company_ID, snack_ID) {
    //
    //Check if the user has already added the snack
    let record = await db('company_snacks').where({ company_ID, snack_ID });
    console.log('record: ', record);
    //
    //If the record exists, just let them know
    if (record && record.length) {
        return Promise.resolve([
            {
                status: 200,
                message: 'Already saved snack',
            },
        ]);
    } else {
        //
        //Else create it
        return db('company_snacks')
            .returning('*')
            .insert({
                company_ID,
                snack_ID,
            });
    }
}

//
//Check snack association
async function validSnackRequest(company_ID, snack_ID) {
    //
    //Check if the user has already added the snack
    let record = await db('company_snacks').where({ company_ID, snack_ID });
    console.log('record: ', record);
    //
    //If the record exists, just let them know
    if (record && record.length != 0) {
        return Promise.resolve(true);
    }
}

//
//Update quantity of a snack
async function updateSnack(company_ID, snack_ID, quantity) {
    return db('company_snacks')
        .returning('*')
        .update({
            quantity,
        })
        .where({ company_ID, snack_ID });
}

//
//Remove company-snack association
function deleteSnack(company_ID, snack_ID) {
    return db('company_snacks')
        .where({ company_ID, snack_ID })
        .delete();
}

//
//Get Suggested Snacks
async function getSuggestions(company_ID) {
    let [company] = await db
        .select('name as company_name')
        .from('companies')
        .where({ company_ID });
    let snacks = await db
        .select('s.*', 'cs.quantity')
        .from('company_snacks as cs')
        .join('snacks as s', 's.snack_ID', 'cs.snack_ID')
        .where({ company_ID });
    let userSuggestions = await db
        .select('u.name', 's.snack_ID')
        .from('user_snacks as us')
        .join('users as u', 'u.user_ID', 'us.user_ID')
        .join('snacks as s', 's.snack_ID', 'us.snack_ID')
        .where('u.company_ID', company_ID);

    console.log(userSuggestions);
    let updatedSnacks = mapUsersToSnacks(snacks, userSuggestions);

    return {
        ...company,
        updatedSnacks,
    };
}

//
//Get company users
async function getUsers(company_ID) {
    let [company] = await db
        .select('name as company_name')
        .from('companies')
        .where({ company_ID });
    let users = await db
        .select('name', 'email', 'user_ID', 'admin')
        .from('users')
        .where({ company_ID });
    let snacks = await db
        .select('s.*', 'u.name as user_name', 'u.email', 'u.user_ID', 'u.admin')
        .from('snacks as s')
        .join('user_snacks as us', 'us.snack_ID', 's.snack_ID')
        .join('users as u', 'u.user_ID', 'us.user_ID')
        .where('u.company_ID', company_ID);

    let updatedUsers = mapSnacksToUsers(users, snacks);

    return { ...company, users: updatedUsers };
}

//
//Delete a user
async function deleteUser(user_ID) {
    return db('users')
        .where({ user_ID })
        .del();
}
