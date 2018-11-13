const express = require("express");
const app = express();
const User = require('./db/models/User');
const Photo = require('./db/models/Photo');
const exphbs = require('express-handlebars');
const PORT = process.env.EXPRESS_HOST_PORT || 8989;
const photoGalleryRouter = require('./routes/photo_gallery');
const userRouter = require('./routes/users');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const utility = require('./utilities/auth');
const bcrypt = require('bcrypt');
const redis = require('connect-redis')(session);

const saltRounds = 12;
app.use(express.static('public'));

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs'
})),
  app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/photo_gallery', photoGalleryRouter);
app.use('/users', userRouter);

app.use(session({
  store: new redis({url: 'redis://redis-server:6379', logErrors:
true}),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((userId, cb) => {
  console.log(userId)
  return new User()
    .where({ id: userId })
    .fetch()
    .then(user => {
      if (!user) {
        cb(null);
      }
      cb(null, user);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
  new User()
  
    .where({ username })
    .fetch()
    .then(user => {
      
      if (!user) {
        return done(null, false, { message: `Incorrect username/password` });
      }
      else{
        bcrypt.compare(password, user.password)
        .then(res => {
          if(res) {return done(null, user);}
          else{
            return done(null, false, {message: 'bad username or password'})
          }
        });
      }
    });
}));

app.get('/register', (req, res) => {
  res.redirect('/register.html')
});

app.post('/register', (req, res)=> {
  
  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(req.body.password, salt, function(err, hash){
      new User ({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
        password: hash
      })
      .save()
      .then((user) => {
        console.log(user);
        res.redirect('/home');
      })
    });
  });
});

app.post('/register', passport.authenticate('local', {
  successRedirect: '/edit',
  failureRedirect: '/register.html'
}));





app.post('/login', passport.authenticate('local', {
  successRedirect: '/views/galleries/edit',
  failureRedirect: '/login.html'
}));


app.get('/secret', utility.isAuthenticated, (req, res) => {
  const { user } = req;//the preferred way to deconstruct an object into a variable
  console.log('user')
  const userObj = user.serialize();
  console.log(userObj)
  //res.redirect('/views/galleries/detail')
  res.send(`You have access to Photo Gallery ${userObj.username}`)
});

app.get('/edit', utility.hasAdminAccess, (req, res) => {
  const user = req.user;
  const userObj = user.serialize();
  // res.send(`You have admin access ${user.username}.`);
  res.redirect('./views/galleries/edit')

})

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
})
module.exports = app;

// app.use('/photo_gallery', photoGalleryRouter)
// app.use('/users', userRouter)
// app.get('/', (req, res)=>{
//   console.log('hello')
//   res.send('hello')
// })