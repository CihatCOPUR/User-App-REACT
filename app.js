const express = require('express');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const methodOverride = require('method-override');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const Photo = require('./models/Photo');

const app = express();

//connected DB
mongoose.connect('mongodb://localhost/photoblog-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});
//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileupload());
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}));


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

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', { photo });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title
  photo.description = req.body.description
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
});

app.delete('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });

  let deletedImage = __dirname + '/public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect('/');
})

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başlatıldı`);
})