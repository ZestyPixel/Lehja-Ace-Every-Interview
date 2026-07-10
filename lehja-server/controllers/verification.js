const User = require('../models/user');
const mongoose = require('mongoose');

async function verification(req, res){
    console.log(req.user);
    const { id } = req.user;
    const user = await User.findById( id );
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const { password, ...data } = user.toObject(); //We do toObject() to convert the Mongoose document into a plain JavaScript object, 
    // which allows us to use destructuring to exclude the password field from the response. 
    res.status(200).json({
        data,
    }); 
}

module.exports = verification;