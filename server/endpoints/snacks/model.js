const db = require('../../dbConfig');
//const knex = require('knex');

module.exports = {
    getSnacks,
    addSnacks,
    getSnackCount,
};

async function getSnackCount() {
    let [count] = await db('snacks').count('snack_ID');
    count = parseInt(count.count);
    console.log(count);
    return count;
}

function getSnacks(page, limit, search) {
    if (search !== '') {
        return db('snacks').whereRaw(`LOWER(name) LIKE ?`, [`%${search}%`]);
    } else {
        return db('snacks')
            .limit(limit)
            .offset(page);
    }
}

async function addSnacks(snacks) {
    let added = db.batchInsert('snacks', snacks);

    return added;
}
