exports.up = function(knex) {
    return knex.schema
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
            t.integer('quantity')
                .default(1)
                .notNullable();
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
        .dropTableIfExists('company_snacks');
};
