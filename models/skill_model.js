const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true, enum: ['language', 'framework', 'tool'] },
    hexColor: { type: String, required: true }
});

module.exports = mongoose.model('Skill', skillSchema);