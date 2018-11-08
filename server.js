const express = require("express");
const app = express();
const expressHandlebars = require('express-handlebars');
const PORT = process.env.EXPRESS_HOST_PORT || 8989;
const photoGalleryRouter = require('./routes/photo_gallery');
const userRouter = require('./routes/users')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}))
// app.use('/photo_gallery', photoGalleryRouter)
// app.use('/users', userRouter)
app.get('/', (req, res)=>{
  console.log('hello')
  res.send('hello')
})

app.use('/photo_gallery', photoGalleryRouter);
app.use('/users', userRouter);




app.listen(PORT, ()=>{
  console.log(`Server listening on PORT ${PORT}`);
})