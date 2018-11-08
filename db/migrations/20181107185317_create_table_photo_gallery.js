
  exports.up = function(knex, Promise) {
    return knex.schema.createTable('photo_gallery', table =>{
      table.increments('id');
      table.string('author', 255).notNullable();
      table.text('description').notNullable();
      table.string('link')
      table.integer('author_id').references('id').inTable('users')
      table.timestamp('created_at').default(knex.fn.now())
      table.timestamp('updated_at').default(knex.fn.now())
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('photo_gallery')
  };
  


