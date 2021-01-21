const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const middleware = require("../middleware");

// Root route - redirect to login screen
router.get("/", (req, res) => {
    res.redirect("/pets");
});

// GET route for register page
router.get("/register", (req, res) => {
    res.render("users/register");
});

// POST route for registering/creating a new user
router.post("/register", async (req, res) => {
    try {
        const { password, username, email, ownerName, petName } = req.body;
        const user = new User({username, email, ownerName, petName});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash("success", "Successfully registered!");
            res.redirect("/pets");
        });
    } catch(error) {
        req.flash("error", "The email/username is already being used!");
        res.redirect("/register");
    }
});


// GET route for login page
router.get("/login", (req, res) => {
    res.render("users/login");
});

// POST route for checking log in credentials
router.post("/login", passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), (req, res) => { 
    req.flash("success", "Welcome Back!");
    res.redirect("/pets");
});


// GET route for loggin a user out of session
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully Logged Out!");
    res.redirect("/login");
});



// GET route for user profile
router.get("/user/:id", middleware.isLoggedIn, (req, res) => {
    User.findById(req.params.id)
        .populate("posts")
        .then(foundUsername => {
            res.render("users/profile", {user: foundUsername});
        })
});

// EDIT route - display a form for a user to edit their profile
router.get("/user/:id/edit", middleware.isUser, (req, res) => {
    User.findById(req.params.id)
        .then(foundUser => {
            res.render("users/edit", {user: foundUser});
        })
});

// UPDATE route - update a user's profile
router.put("/user/:id", middleware.isUser, (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
        res.redirect(`/user/${user._id}`);
    })
});


module.exports = router;
