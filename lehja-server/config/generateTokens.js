const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

function generateTokens(id, res){

    const accessToken = jwt.sign(
        {
            id: id, //Here you put in the information you want to store in the token. In this case, we are storing the user's ID.
// This is so the server knows which user is making the request from the user id that is decoded from the token.
// So if I want to display info about the user, I can use the id to find the user in the database and display their info.
// Same with say email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1m'
        },
    );

    const refreshToken = jwt.sign(
        {
            id: id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        }
    );

    res.cookie("accessToken", accessToken, { //The reason accessToken is written twice is because the first accessToken is the name of the cookie 
// and the second accessToken is the value of the cookie.
        httpOnly: true, //This means that the cookie cannot be accessed by JavaScript. This is a security measure to prevent XSS attacks.
//        secure: true, This means that the cookie can only be sent over HTTPS. This is a security measure to prevent MITM attacks.
        maxAge: 60 * 1000, //This means that the cookie will expire in 1 minute. This is a security measure to prevent session hijacking.
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
//        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, //This means that the cookie will expire in 7 days.
    });

}

module.exports = generateTokens;