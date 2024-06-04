const Project = require('../models/project_model');
const fs = require('fs');

exports.getAll = (req, res) => {
    Project.find()
        .then( projects => {
            res.status(200).json(projects);
        })
        .catch( error => {
            res.status(404).json({ error });
        })
}

exports.getProject = (req, res) => {
    Project.findOne({ _id: req.params.id })
        .then( project => {
            res.status(201).json({project});
        })
        .catch( error => {
            res.status(404).json({error});
        })
}

exports.create = (req, res) => {
    const projectObject = JSON.parse(req.body.project);
    delete projectObject._id;

    const project = new Project({
        ...projectObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    project.save()
        .then( () => {
            res.status(201).json({
                message: 'Project created successfully'
            });
        })
        .catch( error => {
            res.status(400).json({error});
            fs.unlinkSync(`images/${filename}`);
        })
}

exports.modify = (req, res) => {
    const projectObject = JSON.parse(req.body.project);

    if (req.file) {
        const project = Project.findOne({ _id: req.params.id })
            .then( () => {
                if (project.imageUrl) {
                    const filename = project.imageUrl.split('/').pop();
                    fs.unlinkSync(`image/${filename}`);
                }
                project.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            })
            .catch( error => {
                res.status(404).json({error});
            })
    }

    Project.findByIdAndUpdate(req.params.id, projectObject)
        .then( () => {
            res.status(200).json({
                message: 'Project modified successfully'
            });
        })
        .catch( error => {
            res.status(400).json({error});
        })
}

exports.delete = async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id });
        if (!project) {
            return res.status(404).json({
                error: 'Project not found'
            });
        }
        const filename = project.imageUrl.split('/').pop();

        fs.unlinkSync(`images/${filename}`);

        await Project.deleteOne({ _id: req.params.id });
    } catch (error) {
        res.status(400).json({ error });
    }
}