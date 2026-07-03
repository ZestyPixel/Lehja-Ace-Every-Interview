const mongoose = require('mongoose');
const User = require('../models/user');

async function register(req, res){
    try{
        const { email, password } = req.body;
        
        const checkIfExists = await User.findOne({email}); //Complete this logic !!

        const newUser = new User({
            email: email,
            password: password,
        });

        const data = await newUser.save();
        console.log(data);
    }catch(error){
        console.log(error);
    }
}