exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('snacks')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('snacks').insert([
                {
                    name: 'Smokehouse Almonds',
                    brand: 'Blue Diamond',
                    img_url:
                        'https://www.riteaid.com/shop/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/4/041570030837.jpg',
                },
            ]);
        });
};
