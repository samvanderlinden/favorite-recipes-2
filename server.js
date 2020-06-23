const express = require('express');
const connectDB = require('./config/db');
// const path = require('path');

const app = express();

//Connect Database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

// //Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));

app.get('/', (req, res) => res.json({message: 'Welcome to the Favorite Recipes API!!'}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));