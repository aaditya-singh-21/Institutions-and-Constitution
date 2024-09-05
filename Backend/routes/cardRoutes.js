const express = require('express');
const router = express.Router();
const { createCard, getCardsByPart } = require('../controllers/cardController');

// Create a new card
router.post('/card', createCard);

// Get cards by constitutional part (5 or 6)
router.get('/card/:part', getCardsByPart);

module.exports = router;
