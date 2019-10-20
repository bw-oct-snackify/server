exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('company_package')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('company_package').insert([
                {
                    company_ID: 1,
                    package_ID: 1,
                },
            ]);
        });
};
