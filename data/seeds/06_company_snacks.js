exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('company_snacks')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('company_snacks').insert([
                {
                    company_ID: 1,
                    snack_ID: 1,
                },
            ]);
        });
};
