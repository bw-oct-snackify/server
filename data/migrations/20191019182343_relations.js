exports.up = function(knex) {
    return knex.schema
        .createTable('company_package', t => {
            //
            //Company ID
            t.integer('company_ID').unsigned();
            t.foreign('company_ID')
                .references('company_ID')
                .inTable('companies')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            //
            //Package ID
            t.integer('package_ID').unsigned();
            t.foreign('package_ID')
                .references('package_ID')
                .inTable('packages')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('company_snacks', t => {
            //
            //Company ID
            t.integer('company_ID').unsigned();
            t.foreign('company_ID')
                .references('company_ID')
                .inTable('companies')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            //
            //Snack ID
            t.integer('snack_ID').unsigned();
            t.foreign('snack_ID')
                .references('snack_ID')
                .inTable('snacks')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('user_snacks', t => {
            //
            //user ID
            t.integer('user_ID').unsigned();
            t.foreign('user_ID')
                .references('user_ID')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            //
            //Snack ID
            t.integer('snack_ID').unsigned();
            t.foreign('snack_ID')
                .references('snack_ID')
                .inTable('snacks')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('user_snacks')
        .dropTableIfExists('company_snacks')
        .dropTableIfExists('company_package');
};
