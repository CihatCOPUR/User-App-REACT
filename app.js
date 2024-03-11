const express = require('express');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');

const app = express();

//connected DB
mongoose.connect('mongodb://localhost/photoblog-db');
//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', async (req, res) => {
  const photos = await Photo.find()
  res.render('index', { photos });
})
app.get('/add', (req, res) => {
  res.render('add');
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
})

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başlatıldı`);
})