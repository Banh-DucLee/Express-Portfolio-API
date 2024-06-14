const mongoose = require('mongoose');
const Social = require('./social_model');

const aboutSchema = mongoose.Schema({
    text: { type: String, required: true },
    textEnglish: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('About', aboutSchema);