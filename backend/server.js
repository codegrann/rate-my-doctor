const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/rmp-clone', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Routes
app.get('/', (req, res) => {
    res.send('Rate My Professors Clone API');
});

app.get('/top-rated', (req, res) => {
    res.json([
        { id: 1, name: 'Dr. Jane Doe', college: 'XYZ University', rating: 4.9 },
        { id: 2, name: 'Dr. John Smith', college: 'ABC College', rating: 4.8 }
    ]);
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
