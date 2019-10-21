exports.up = function(knex) {
    return knex.schema.createTable('companies', t => {
        t.increments('company_ID');
        t.string('company_code')
            .nullable()
            .comment('Server generate code to give to employees');
        t.string('name').nullable();
        t.string('phone').nullable();
        t.string('city').nullable();
        t.string('state').nullable();
        t.integer('package_ID')
            .unsigned()
            .defaultTo(1);
        t.foreign('package_ID')
            .references('package_ID')
            .inTable('packages');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('companies');
};
