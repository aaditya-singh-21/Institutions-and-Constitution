const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

require("./db.conn");
dotenv.config();
const Register = require("./models/registers");
const authRoutes = require('./routes/authRoutes');

// Connect to MongoDB
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Allows cross-origin requests

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', require('./routes/ContactRoutes'));
app.use('/api/cards', require('./routes/cardRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
