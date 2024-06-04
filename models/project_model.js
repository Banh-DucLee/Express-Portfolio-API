const mongoose = require('mongoose');
const Skill = require('./skill_model');

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    descriptionEnglish: { type: String, required: true},
    githubUrl: { type: String, required: true },
    liveDemoUrl: { type: String },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: Skill, required: true}]
});

module.exports = mongoose.model('Project', projectSchema);