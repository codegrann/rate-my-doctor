require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const ratingsRoutes = require('./routes/ratings');

const CONNECTION_STRING=process.env.CONNECTION_STRING

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(CONNECTION_STRING)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

app.use('/auth', authRoutes);
app.use('/ratings', ratingsRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
