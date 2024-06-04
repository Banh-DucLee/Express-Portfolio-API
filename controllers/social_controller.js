const Social = require('../models/social_model');
const fs = require('fs');

exports.getAll = (req, res) => {
    Social.find()
        .then( social => {
            res.status(200).json(social);
        })
        .catch( error => {
            res.status(404).json({ error });
        })
}

exports.getSocial = (req, res) => {
    Social.findOne({ _id: req.params.id })
        .then( social => {
            res.status(200).json(social);
        })
        .catch( error => {
            res.status(404).json({error});
        })
}

exports.create = (req, res) => {
    const socialObject = JSON.parse(req.body.social);
    delete socialObject._id;

    const social = new Social({
        ...socialObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    social.save()
        .then( () => {
            res.status(201).json({
                message: 'Social created successfully'
            })
        })
        .catch( error => {
            res.status(400).json({error});
            const filename = social.imageUrl.split('/').pop();
            fs.unlinkSync(`images/${filename}`);
        })
}

exports.delete = async (req, res) => {
    try {
        const social = await Social.findOne({ _id: req.params.id });
        if (!social) {
            return res.status(404).json({
                error: 'Social not found'
            });
        }
        const filename = social.imageUrl.split('/').pop();
        fs.unlinkSync(`images/${filename}`);

        await Social.deleteOne({ _id: req.params.id });
    } catch (error) {
        res.status(400).json({ error });
    }
}