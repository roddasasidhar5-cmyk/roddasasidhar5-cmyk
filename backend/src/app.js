const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Placement Portal API is running' });
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const learningRoutes = require('./routes/learningRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/learning', learningRoutes);

module.exports = app;
