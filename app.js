const express = require('express');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const Photo = require('./models/Photo');

const app = express();

//connected DB
mongoose.connect('mongodb://localhost/photoblog-db');
//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileupload());


app.get('/', async (req, res) => {
  const photos = await Photo.find().sort('-dateCreated')
  res.render('index', { photos });
})
app.get('/add', (req, res) => {
  res.render('add');

});

app.get('/photos/:id', async (req, res) => {
  // res.render('');
  // console.log(req.params.id)
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.post('/photos', (req, res) => {

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name
    });

    res.redirect('/');
  })


})

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başlatıldı`);
})