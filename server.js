const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');

const authRoutes = require('./routes/authRoutes'); // Ensure you have this file
const protectedRoutes = require('./routes/protected'); // Ensure you have this file

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${PORT}`);
});
