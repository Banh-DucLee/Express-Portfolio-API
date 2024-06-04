const About = require('../models/about_model');
const fs = require('fs');

exports.getAbout = (req, res) => {
    About.find()
        .then( abouts => {
            res.status(200).json(abouts);
          })
         .catch( error => {
            res.status(404).json({ error });
          })

}

exports.create = (req, res) => {
    const aboutObject = JSON.parse(req.body.about);
    delete aboutObject._id;

    const about = new About({
        ...aboutObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })

    about.save()
        .then( () => {
            res.status(201).json({
                message: 'About created successfully'
            });
        })
        .catch( error => {
            res.status(400).json({error});
            fs.unlinkSync(`images/${req.file.filename}`);
        })
}

exports.modify = (req, res) => {
    const aboutObject = JSON.parse(req.body.about);

    if (req.file) {
        const about = About.findOne({ _id: req.params.id })
            .then( () => {
                if (about.imageUrl) {
                    const filename = about.imageUrl.split('/').pop();
                    fs.unlinkSync(`images/${filename}`);
                }
                about.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            })
            .catch( error => {
                res.status(404).json({error});
            })
    }

    About.findOneAndUpdate({ _id: req.params.id }, aboutObject)
        .then( () => {
            res.status(200).json({
                message: 'About modified successfully'
            });
        })
        .catch( error => {
            res.status(400).json({error});
        })
}