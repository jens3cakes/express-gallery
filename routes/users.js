const express = require('express');
const User = require('../db/models/User');
const router = express.Router();

router.get('/', (req,res) =>{
  return User.fetchAll()
  .then(users => {
    res.json(users);
  })
  .catch(err => console.log(err))
});

router.get('/:id', (req,res) => {
  let data = req.params.id;
  return new User().where({id:parseInt(data)})
  .fetch({
    colums: ['id', 'first_name', 'email'],
    withRelated: ['posts']
  })
  .then(users => {
    if(users !== null){
     
      const locals = users.serialize();
     
      res.render('users/detail', locals);
      // res.json(users);
    }else if(users === null || users === []){
      res.status(404).send(`User ${data} not found.`)
    }
  })
  .catch(err => console.log(err))
});

router.post('/', (req, res) =>{
  let data = req.body;

  return new User({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
  })
  .save()
  .then(user => {
    return res.json(user);
  })
  .catch(err => console.log(err))
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if(parseInt(id) !== data.id){
    res.status(404).json({message: `Cannot update user ${id} due to data`})
  }
  return new User()
  .where({id:id})
  .fetch()
  .then(user => {
    if(!user){
    res.status(404).json({message: `User ${id} not found.`})
    }
    if(user){
      user.set()
      .save(
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email
        },
        {patch:true}
      )
    }
  })
  .then(updatedUser => {
    console.log((updatedUser))
    res.join(updatedUser)
  })
  .catch(err => console.log(err))
});



module.exports=router;