const knex = require('../knex');//connection to the database
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');


module.exports = bookshelf;
