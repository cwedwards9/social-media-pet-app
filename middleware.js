const db = require("./models");

// Object of middleware
const middlewareAuth = {
    // Middleware to restrict routes if a user is not logged in
    // Use passport method to check if authenticated
    isLoggedIn(req, res, next) {
        // If no auth, redirect to login
        if(!req.isAuthenticated()) {
            return res.redirect("/login");
        }
        // If user is logged in, continue with the request
        next();
    },

    // Restrict routes if a user is not the authorized user
    isPostOwner(req, res, next) {
        // If the user is logged in, continue to check the ownership of the post
        if(req.isAuthenticated()){
            db.Post.findById(req.params.id, function(err, foundPost){
                if(err){
                    res.redirect("/pets");
                } else {
                    // If the desired post's 'author' is equal to the current user, continue the request
                    if(foundPost.user.id.equals(req.user._id)) {
                        next();
                    } else {
                        // If the user is not the owner of the post, redirect them
                        res.redirect("/pets")
                    }
                }
            })
        } else {
            // If the user isn't authenticated / logged in, redirect them
            res.redirect("/pets");
        }
    }
}


module.exports = middlewareAuth;