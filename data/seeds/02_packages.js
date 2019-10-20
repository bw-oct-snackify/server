exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('packages')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('packages').insert([
                {
                    name: 'small',
                    price: 199.0,
                    snacks: 10,
                },
                {
                    name: 'medium',
                    price: 399.0,
                    snacks: 25,
                },
                {
                    name: 'large',
                    price: 599.0,
                    snacks: 60,
                },
                {
                    name: 'mega',
                    price: 1999.0,
                    snacks: 100,
                },
            ]);
        });
};
