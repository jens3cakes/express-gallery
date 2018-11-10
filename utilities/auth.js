module.exports = {
  isAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log('fart')
      return next();
    }
    console.log('hello')
    res.redirect('/login.html');
  },

  hasAdminAccess: function (req, res, next) {
    if (req.isAuthenticated()) {
      if (req.users.id === photo.author_id) {
        return next;
      }
      return res.redirect('/')
    }
    res.redirect('/login.html')
  }
}

