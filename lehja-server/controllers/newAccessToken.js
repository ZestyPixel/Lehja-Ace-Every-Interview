const { verifyRefreshToken } = require("../config/verifyRefreshToken");
const generateAccessToken = require('../config/generateAccessToken');

async function newAccessToken(req, res){
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            message: "Invalid refresh token"
        });
    }
    
    try{
        const decode = await verifyRefreshToken(refreshToken, res);
         console.log("gghg")
        const token = await generateAccessToken(decode.id, res);
         console.log(token);
        return res.json({
            message: "Token generated"
        });
    }catch(error){
        return res.json({
            message: error.message
        })
    }
}

module.exports = newAccessToken;