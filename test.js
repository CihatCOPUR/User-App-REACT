const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Connect DB

mongoose.connect('mongodb://localhost/photoblog-db');


// create schema

const PhotoSchema = new Schema({
    title: String,
    description: String
});

const Photo = mongoose.model('Photo', PhotoSchema);

//create a photo

// Photo.create({
//     title: 'Photo title 2',
//     description: ' Photo 2 description'
// })

//read a photo

// Photo.find({},(err,data)=>{
//     console.log(data)
// })


//update photo


// Photo.findByIdAndUpdate(id, {
//     title: 'Photo title 13',
//     description: 'Photo 13 description'
// })

function belgeyiGuncelle(id, yeniVeri) {
    return Photo.findByIdAndDelete(id,{ new: true })
        .then(sonuc => {
            console.log('Güncellenmiş belge:', sonuc);
            return sonuc;
        })
        .catch(hata => {
            console.error('Hata:', hata);
            throw hata;
        });
}

// Örnek kullanım
const id = '65eeb0f52dffa4aaaa43a47b';
// const yeniVeri = {
//     title: 'photos newwww',
//     description: 'newwww description'
// };

belgeyiGuncelle(id);

