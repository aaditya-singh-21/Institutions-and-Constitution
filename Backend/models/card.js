const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    part: { type: String, required: true },  // Part 5 or Part 6
    title: { type: String, required: true },  // Title of the constitutional article
    content: { type: String, required: true },  // Flip card content
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Card', CardSchema);
