exports.up = function(knex) {
    return knex.schema.createTable('companies', t => {
        t.increments('company_ID');
        t.string('company_code')
            .notNullable()
            .comment('Server generate code to give to employees');
        t.string('name').notNullable();
        t.string('phone').notNullable();
        t.string('city').notNullable();
        t.string('state').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('companies');
};
