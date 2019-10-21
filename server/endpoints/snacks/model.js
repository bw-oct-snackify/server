const db = require('../../dbConfig');

module.exports = {
    getSnacks,
};

function getSnacks() {
    return db('snacks');
}
