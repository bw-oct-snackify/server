exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('packages')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('packages').insert([
                {
                    name: 'small',
                    description: '0 - 10 employees',
                    price: 199.0,
                    snacks: 10,
                },
                {
                    name: 'medium',
                    description: '11 - 50 employees',
                    price: 399.0,
                    snacks: 25,
                },
                {
                    name: 'large',
                    description: '51 - 100 employees',
                    price: 599.0,
                    snacks: 60,
                },
                {
                    name: 'mega',
                    description: '>100 employees',
                    price: 1999.0,
                    snacks: 100,
                },
            ]);
        });
};
