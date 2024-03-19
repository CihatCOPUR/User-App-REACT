
const Photo = require('../models/Photo');
const fs = require('fs')


exports.getAllPhotos = async (req, res) => {
    const photos = await Photo.find().sort('-dateCreated')
    res.render('index', { photos });
}


exports.getPhoto = async (req, res) => {
    // res.render('');
    // console.log(req.params.id)
    const photo = await Photo.findById(req.params.id);
    res.render('photo', { photo });
}

// exports.createPhoto = async (req, res) => {

//     const uploadDir = '/../public/uploads';

//     if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir);
//     }

//     let uploadedImage = req.files.image;
//     let uploadPath = __dirname + '/../public/uploads' + uploadedImage.name

//     uploadedImage.mv(uploadPath, async () => {
//         await Photo.create({
//             ...req.body,
//             image: '/public/uploads' + uploadedImage.name
//         });

//         res.redirect('/');
//     })
// }

exports.createPhoto = async (req, res) => {
    const uploadDir = __dirname + '/../public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    let uploadedImage = req.files.image;
    let uploadPath = uploadDir + '/' + uploadedImage.name;

    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name // Yolu düzeltmek için "/uploads/" ekledik
        });

        res.redirect('/');
    });
}


exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    res.render('edit', { photo });
}

exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });

    let deletedImage = __dirname + '/../public' + photo.image;
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndDelete(req.params.id);
    res.redirect('/');
}