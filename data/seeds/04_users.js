const b = require('bcryptjs');

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                {
                    company_ID: 1,
                    name: 'Amanda Lane',
                    email: 'test@test.com',
                    password: b.hashSync('password', 10),
                },
            ]);
        });
};
