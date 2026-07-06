const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function verifyRefreshToken(refreshToken, res) {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    return decoded;
}

module.exports = { 
    verifyRefreshToken, 
};