const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function verify(req, res, next){ //This function needs to run in every protected path since http is stateless and does not remember the user. 
    // So we need to verify the token in every request to protected paths.
    const authHeader = req.headers.authorization; 
    
    if (!authHeader) { // If there is no token we stop here.
        return res.json({
            message: "Unauthorized"
        });
    }

    const token = authHeader.split(' ')[1]; // This is because the token is sent in the format "Bearer <token>". 
    // So we split the string by space and take the second part which is the token.

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //Storing the decoded token (id, email) so that after verification we can use it to fetch data or do anything else.
        // This ensures that the user is authenticated and we can use the information in the token to identify the correct user in subsequent requests.
        next();
    }catch(error){
        return res.json({
            message: "Invalid Token",
        });
    }
}