
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table =>{
    table.increments('id');
    table.string('first_name', 50).notNullable();
    table.string('last_night', 50).notNullable();
    table.string('email', 50).notNullable();
    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
