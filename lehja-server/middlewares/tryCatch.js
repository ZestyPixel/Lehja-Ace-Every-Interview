function tryCatch (handler){ //handler is a function that is passed in as an argument.
    return async(req, res, next)=>{ //we return a new function that will handle errors that occur in the handler function.
        try{
            await handler(req, res, next); //here we call the handler function.
        }catch(error){
            res.status(500).json({//500 is internal server error.
                message: error.message,
            });
        }
    }
}

//We return a new function here so that when the server starts, it will call tryCatch immediately and will store the returned function in the route handler. 
// This way, when a request is made to the route, the returned function will be called and will handle any errors that occur in the handler function. 

module.exports = tryCatch;