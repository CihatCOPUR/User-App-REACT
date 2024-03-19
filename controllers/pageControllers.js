const Photo = require('../models/Photo')



exports.getAboutPage = (req, res) => {
    res.render('about');
};

exports.getAddPage = (req, res) => {
    res.render('add');
};

exports.getEditPage = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save();
    res.redirect(`/photos/${req.params.id}`);
} 