const express = require('express');
const mongoose = require('mongoose');
const corsMiddleware = require('./middlewares/cors_middleware');

const app = express();
// Set Response Header to allow any Origin
app.use(corsMiddleware);

mongoose.connect(`mongodb+srv://ducleebanh:Yz7fUvzYZwXeGBSD@portfolio.sxnwpzj.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Connected to MongoDB'))
      .catch(() => console.log('Error while connecting to MongoDB'));

app.use(express.json());

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

const authRoutes = require('./routes/user_route');
app.use('/api/auth', authRoutes);

const skillRoutes = require('./routes/skill_route');
app.use('/api/skills', skillRoutes);

const projectRoutes = require('./routes/project_route');
app.use('/api/projects', projectRoutes);

const socialRoutes = require('./routes/social_route');
app.use('/api/socials', socialRoutes);

const aboutRoutes = require('./routes/about_route');
app.use('/api/abouts', aboutRoutes);

const contactRoutes = require('./routes/contact_route');
app.use('/api/contacts', contactRoutes);

const resumeRoutes = require('./routes/resume_route');
app.use('/api/resume', resumeRoutes);

module.exports = app;