const b = require('bcryptjs');

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users')
        .truncate()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { username: 'test', password: b.hashSync('password', 10) },
            ]);
        });
};
