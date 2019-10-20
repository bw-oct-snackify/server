exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('user_snacks')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('user_snacks').insert([
                {
                    user_ID: 1,
                    snack_ID: 1,
                },
            ]);
        });
};
