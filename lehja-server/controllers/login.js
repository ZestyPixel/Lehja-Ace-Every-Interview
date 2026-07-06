const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateTokens = require('../config/generateTokens');

async function login(req, res){
        console.log('hellosdasd')

    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.json({ error: 'Invalid credentials' });
    }
    const compare = await bcrypt.compare(password, user.password);
     if (!compare) {
        return res.json({ error: 'Invalid credentials' });
    }
    
    generateTokens(user._id, res);

    res.json({
        message: 'Login successful',
    });
}

module.exports = login;