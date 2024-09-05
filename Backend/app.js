const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(bodyParser.json());

// Define routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contact', require('./routes/ContactRoutes'));
app.use('/api/cards', require('./routes/cardRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});