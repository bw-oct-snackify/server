const db = require('../../dbConfig');

module.exports = {
    getPackages,
};

function getPackages() {
    return db('packages');
}
