const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function login(req, res){
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.json({ error: 'Invalid credentials' });
    }
    const compare = await bcrypt.compare(password, user.password);
     if (!compare) {
        return res.json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
        {
            id: user._id, //Here you put in the information you want to store in the token. In this case, we are storing the user's ID.
            // This is so the server knows which user is making the request from the user id that is decoded from the token.
            // So if I want to display info about the user, I can use the id to find the user in the database and display their info.
            // Same with say email
            email: email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        },
    );

    res.json({
        message: 'Login successfull',
        token,
    });
}