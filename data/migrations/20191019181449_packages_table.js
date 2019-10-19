exports.up = function(knex) {
    return knex.schema.createTable('packages', t => {
        t.increments('package_ID');
        t.string('name');
        t.float('price');
        t.integer('snacks');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('packages');
};
