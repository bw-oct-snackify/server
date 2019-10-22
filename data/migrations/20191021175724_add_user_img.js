exports.up = function(knex) {
    return knex.schema.table('users', t => {
        t.string('img_url')
            .nullable()
            .defaultTo(
                'https://www.catster.com/wp-content/uploads/2015/06/8698_choc_bosscat_full2.jpg'
            );
    });
};

exports.down = function(knex) {
    return knex.schema.table('users', t => {
        t.dropColumn('img_url');
    });
};
