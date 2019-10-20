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
                    uom: '16 oz bag',
                    img_url:
                        'https://www.riteaid.com/shop/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/4/041570030837.jpg',
                },
                {
                    name: 'Original Skittles',
                    brand: 'Wrigley',
                    uom: '54 oz bag',
                    img_url:
                        'https://images-na.ssl-images-amazon.com/images/I/71dHUI2QzEL._SX425_.jpg',
                },
                {
                    name: 'Original Doritos',
                    brand: 'Frito-Lay',
                    uom: '16 x 9oz bags',
                    img_url:
                        'https://target.scene7.com/is/image/Target/GUEST_ac2b08b4-12e8-496c-ab09-dd530740da9c?wid=488&hei=488&fmt=pjpeg',
                },
                {
                    name: 'Original Golfish',
                    brand: 'Pepperidge Farms',
                    uom: '30 oz box',
                    img_url:
                        'https://images-na.ssl-images-amazon.com/images/I/51615qZv50L.jpg',
                },
            ]);
        });
};
