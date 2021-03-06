const bookshelf = require('./bookshelf');
//const posts = require('./Posts') not needed beacuse of registry instanciation



class User extends bookshelf.Model{
  
  get tableName(){return 'users'}
  get hasTimestamps(){return true}
  posts(){
    return this.hasMany('Photo', 'author_id');
  }

}

module.exports = bookshelf.model('User', User);