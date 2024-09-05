const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');

// Handle "Contact Us" form submission
router.post('/contact', submitContact);

module.exports = router;
