const express = require('express');
const User = require('../db/models/User');
const router = express.Router();

router.get('/', (req, res) => {
  return User.fetchAll({
    withRelated: 'posts'
  })
    .then(users => {
      const usersArr = users.serialize();
      res.render('users/home', { users: usersArr })
    })
    .catch(err => console.log(err))
});

router.get('/home', (req, res) => {
  return User.fetchAll({
    withRelated: 'posts'
  })
    .then(users => {
      const usersArr = users.serialize();
      res.render('users/home', { users: usersArr })
      // res.json(users)
    })
})


router.post('/', (req, res) => {
  let data = req.body;

  return new User({
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    username: data.username,
    password: data.password
  })
    .save()
    .then(user => {
      return res.json(user);
    })
    .catch(err => console.log(err))
});

router.get('/:id/edit', (req, res) => {
  const id = parseInt(req.params.id);
  if (id !== req.user.id) {
    return res.redirect(`/users/${id}`)
  }
  return new User()
    .where({ id: id })
    .fetch({ require: true })
    .then(user => {
      const userObj = user.serialize();
      res.render('users/edit', userObj)
    });
})

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  if (id !== data.id) {
    return res.status(404).json({ message: `Cannot update user ${id} due to data` })
  }
  return new User()
    .where({ id: id })
    .fetch()
    .then(user => {
      if (!user) {
        res.status(404).json({ message: `User ${id} not found.` })
      }
      if (user) {
        return user.save(
          {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
          },
          { patch: true }
        )
      }
    })
    .then(updatedUser => {
      console.log((updatedUser))
      res.redirect(`/users/${id}`)
    })
    .catch(err => console.log(err))
});

router.get('/:id', (req, res) => {
  let data = req.params.id;
  return new User().where({ id: parseInt(data) })
    .fetch({
      withRelated: 'posts'
    })
    .then(users => {
      if (users !== null) {
        const locals = users.serialize();

        res.render('users/detail', locals);
        // res.json(users);
      } else if (users === null || users === []) {
        res.status(404).send(`User ${data} not found.`)
      }
    })
    .catch(err => console.log(err))
});


module.exports = router;