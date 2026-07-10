const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function verify(req, res, next){ //This function needs to run in every protected path since http is stateless and does not remember the user. 
    // So we need to verify the token in every request to protected paths.
    const getToken = req.cookies.accessToken; 
    console.log('hello')
    if (!getToken) { // If there is no token we stop here.
        return res.status(401).json({
            message: "Unauthorized, no token"
        });
    }

    try {
        const decoded = jwt.verify(getToken, process.env.JWT_SECRET);
        req.user = decoded; //Storing the decoded token (id, email) so that after verification we can use it to fetch data or do anything else.
// This ensures that the user is authenticated and we can use the information in the token to identify the correct user in subsequent requests.        
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Token expired or invalid" });
    }
}

module.exports = verify;