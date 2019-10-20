exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('companies')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('companies').insert([
                {
                    company_code: 'lambda-school-snackify-123',
                    name: 'Lambda School',
                    phone: '123-456-7890',
                    city: 'Salt Lake',
                    state: 'UT',
                },
            ]);
        });
};
