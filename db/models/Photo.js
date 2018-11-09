const bookshelf = require('./bookshelf');
//const User = require('./User'); not needed because of registry instanciation


class Photo extends bookshelf.Model {

  get tableName() { return 'photo_gallery' }
  get hasTimestamps() { return true }

  author_id() {
    return this.belongsTo('User', 'author_id');
  }

}

module.exports = bookshelf.model('Photo', Photo);