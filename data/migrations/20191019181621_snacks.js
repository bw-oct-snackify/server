exports.up = function(knex) {
    return knex.schema.createTable('snacks', t => {
        t.increments('snack_ID');
        t.string('name').notNullable();
        t.string('brand').notNullable();
        t.string('uom')
            .notNullable()
            .comment('unit of measure');
        t.string('img_url').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('snacks');
};
