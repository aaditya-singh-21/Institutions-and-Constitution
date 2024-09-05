// backend/server.js

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const constitutionRoutes = require('./routes/constitution');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/constitution', constitutionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
