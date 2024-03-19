const express = require('express');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const app = express();
const photoController = require('./controllers/photoControllers')
const pageController = require('./controllers/pageControllers')

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


//controllers
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
// app.get('/photos/:id/add', pageController.getAddPage); hata var
app.get('/photos/edit/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);



app.get('/add', pageController.getAddPage);
app.get('/about', pageController.getAboutPage);
app.put('/photos/:id', pageController.getEditPage);





const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başlatıldı`);
})