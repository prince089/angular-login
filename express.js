const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3600;

// Define a user schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

// Create a User model
const User = mongoose.model('User', userSchema);

// Connect to your MongoDB database (replace with your database connection string)
mongoose.connect('mongodb://127.0.0.1:27017/login', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Register a new user
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(409).json({ message: 'User with this email already exists' });
        } else {
            const newUser = new User({ email, password });
            await newUser.save();
            res.json({ message: 'Registration successful' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.sendFile(__dirname +'/login.html')//change file name
        } else {
            res.sendFile(__dirname +'/login.html')//doen
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/login.html')
}) 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});