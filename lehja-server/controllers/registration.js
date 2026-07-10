const mongoose = require('mongoose');
const User = require('../models/user');
const tryCatch = require('../middlewares/tryCatch');
const sanitize = require('mongo-sanitize');
const check = require('../config/zod');

async function registeration(req, res){
    console.log(req.body);
    const data = sanitize(req.body); //sanitize is used to prevent NoSQL injection attacks. 
//It removes any keys that start with $ or contain a . from the input object.    

    const checkData = check.safeParse(data);

    if(!checkData.success){
        const error = checkData.error.issues;
        const errors = error.map((element)=>({
            message: element.message,
        }));
        console.log(errors);
        return res.json({
            errors: errors,
        });
    }
    const { name, email, password } = data;
    const checkIfExists = await User.findOne({email}); //Complete this logic !!

    const newUser = new User({
        name: name,
        email: email,
        password: password,
    });

    const newUserData = await newUser.save();
    console.log(newUserData);
    res.status(201).json({message: "sucess"});
}

module.exports= registeration ;