const express = require('express')
const Photo = require('../db/models/Photo');
const router = express.Router();

router.get('/', (req,res) => {
  return Photo.fetchAll()
  .then(photo => {
    res.json(photo);
  })
  .catch(err => console.log(err))
});

router.post('/', (req, res) => {
  let data = req.body;

  return new Photo({
    author: data.author,
    description: data.description,
    link: data.link,
    author_id: data.author_id
  })
  .save()
  .then(photo => {
    return res.json(photo);
  })
  .catch(err => console.log(err))
});






module.exports = router;