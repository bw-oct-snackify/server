const db = require('../../dbConfig');

module.exports = {
    getSnacks,
    addSnacks,
};

function getSnacks() {
    return db('snacks');
}

async function addSnacks(snacks) {
    let added = db.batchInsert('snacks', snacks);

    return added;
}
