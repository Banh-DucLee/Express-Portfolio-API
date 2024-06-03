const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true, enum: ['language', 'framework', 'tool'] },
});

module.exports = mongoose.model('Skill', skillSchema);