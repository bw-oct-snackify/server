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
                {
                    name: 'Pepper Jack Cheez-It',
                    brand: 'Sunshine',
                    uom: '48 oz box',
                    img_url:
                        'https://s7d6.scene7.com/is/image/bjs/266604?$bjs-Zoom$',
                },
                {
                    name: 'Movie Theater Butter Popcorn',
                    brand: 'Orville Redenbacher',
                    uom: '12, 3 oz bags',
                    img_url:
                        'https://i5.walmartimages.com/asr/f3d3ee48-61b9-48f1-9642-93c3d113f96c_1.a9a8a235fefd1dc50f613aed9b66778e.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff',
                },
                {
                    name: 'Pretzels',
                    brand: 'Utz',
                    uom: '60 oz container',
                    img_url:
                        'https://i5.walmartimages.com/asr/85edf0bf-47b9-4efe-b80e-763471331418_1.a76a799e184d45f79b649ee95b1cfa43.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff',
                },
                {
                    name: 'Slim Jims',
                    brand: 'Conagra',
                    uom: '46 8g sticks',
                    img_url:
                        'https://images-na.ssl-images-amazon.com/images/I/91vFHKbAnKL._SL1500_.jpg',
                },
                {
                    name: 'Rice Krispies Treats',
                    brand: 'Kellogs',
                    uom: '16, 22g bars',
                    img_url:
                        'https://images-na.ssl-images-amazon.com/images/I/91Ys2CURhtL._SL1500_.jpg',
                },
                {
                    name: 'Chewy | Dipped Chewy',
                    brand: 'Quaker Oats',
                    uom: '58 bars',
                    img_url:
                        'https://images-na.ssl-images-amazon.com/images/I/91zqi-KptOL._SL1500_.jpg',
                },
            ]);
        });
};
