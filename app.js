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

const authRoutes = require('./routes/user_route');
app.use('/api/auth', authRoutes);

module.exports = app;