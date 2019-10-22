const db = require('../../dbConfig');

module.exports = {
    getCompanyInfo,
};

function getCompanyInfo(company_ID) {
    return db('companies')
        .where({ company_ID })
        .first();
}
