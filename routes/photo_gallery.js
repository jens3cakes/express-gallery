const express = require('express')
const Photo = require('../db/models/Photo');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('galleries/new')
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