exports.up = function(knex) {
    return knex.schema.createTable('users', t => {
        t.increments('user_ID');
        t.integer('company_ID')
            .unsigned()
            .notNullable();
        t.foreign('company_ID')
            .references('company_ID')
            .inTable('companies')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        t.string('name').notNullable();
        t.string('email').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
