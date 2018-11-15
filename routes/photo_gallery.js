const express = require('express')
const Photo = require('../db/models/Photo');
const utility = require('../utilities/auth')
const router = express.Router();

router.get('/:id/new', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(req.body)
  if(id !== req.user.id){
    return res.redirect('/login')
  }
  return res.render('galleries/new')
})

router.post('/new', (req, res) => {
  let data = req.body;
  console.log(req.body)
  return new Photo({
    author: data.author,
    description: data.description,
    link: data.link,
    author_id: data.author_id
  })
    .save()
    .then(photo => {
      const locals = photo.serialize();
      res.render('galleries/detail', locals);
    })
    .catch(err => console.log(err))
});

router.get('/:id', (req, res) => {
  let data = req.params.id;
  return new Photo().where({ id: parseInt(data) })
    .fetch({})
    .then((photo) => {
      if (photo !== null) {
        const locals = photo.serialize();
        res.render('galleries/detail', locals);
      } else if (photo === null || photo === []) {
        res.status(404).send(`User ${data} not found.`)
      }
    })
    .catch(err => console.log(err))
});







module.exports = router;