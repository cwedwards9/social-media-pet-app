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
    }
}


module.exports = middlewareAuth;