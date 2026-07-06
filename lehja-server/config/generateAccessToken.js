const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function generateAccessToken(id, res) {
    const token = jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '1m' }
    );

    res.cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 60 * 1000,
    });

    return token;
}

module.exports = generateAccessToken;