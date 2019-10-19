exports.up = function(knex) {
    return knex.schema.createTable('snacks', t => {
        t.increments('snack_ID');
        t.string('name');
        t.string('brand');
        t.string('img_url');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('snacks');
};
