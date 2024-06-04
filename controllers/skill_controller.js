const Skill = require('../models/skill_model');
const fs = require('fs');

exports.getAll = (req, res) => {
    Skill.find()
        .then( skills => {
            res.status(200).json(skills);
        })
        .catch( error => {
            res.status(404).json({ error });
        })
}

exports.getSkill = (req, res) => {
    Skill.findOne({ _id: req.params.id })
        .then( skill => {
            res.status(200).json(skill);
        })
        .catch( error => {
            res.status(404).json({error});
        })
}

exports.create = (req, res) => {
    const { name, category } = req.body;
    
    const skill = new Skill({
        name,
        category,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    skill.save()
        .then( () => {
            res.status(201).json({
                message: 'Skill created successfully'
            })
        })
        .catch( error => {
            res.status(400).json({ error });
        })
}

exports.delete = async (req, res) => {
    try {
        const skill = await Skill.findOne({_id: req.params.id});
        if (!skill) {
            return res.status(404).json({
                error: 'Skill not found'
            });
        }
        const filename = skill.imageUrl.split('/').pop();

        fs.unlinkSync(`images/${filename}`);
        
        await Skill.deleteOne({_id: req.params.id});

        res.status(200).json({
            message: 'Skill deleted successfully'
        });
    } catch (error) {
        res.status(400).json({ error });
    }
}