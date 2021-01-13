const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

// Root route - redirect to login screen
router.get("/", (req, res) => {
    res.redirect("/login");
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
        res.redirect("/pets");
    } catch(err) {
        console.log(err.message);
        res.redirect("/register");
    }
});


// GET route for login page
router.get("/login", (req, res) => {
    res.render("users/login");
});

// POST route for checking log in credentials
router.post("/login", passport.authenticate("local"), (req, res) => { //{failureFlash: true, failureRedirect: "/login"}
   res.redirect("/pets");
});



module.exports = router;
