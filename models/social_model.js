const mongoose = require('mongoose');

const socialSchema = mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    url: { type: String, required: true },
});

module.exports = mongoose.model('Social', socialSchema);