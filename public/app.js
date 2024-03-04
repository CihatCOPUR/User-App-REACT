const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  const photo = {
    'id': '123',
    'name': 'photoname',
    'desc': 'photo desc'
  }
  res.send(photo);
})


const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başlatıldı`);
})