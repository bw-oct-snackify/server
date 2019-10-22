const db = require('../../dbConfig');

module.exports = {
    getCompanyInfo,
    updateCompany,
    getSnacks,
};

function getCompanyInfo(company_ID) {
    return db('companies')
        .where({ company_ID })
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
        .select('s.name', 's.brand', 's.uom', 's.img_url')
        .from('snacks as s')
        .join('company_snacks as cs', 'cs.snack_ID', 's.snack_ID')
        .where('cs.company_ID', company_ID);
    return {
        ...company,
        snacks,
    };
}
