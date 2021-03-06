const bookshelf = require('./bookshelf');
//const User = require('./User'); not needed because of registry instanciation




class Photo extends bookshelf.Model{
  
  get tableName(){return 'photo-gallery'}
  get hasTimestamps(){return true}
  
  author(){
    return this.belongsTo(User, 'author_id');
  }





}

module.exports = bookshelf.model('Photo', Photo);