const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Root route - redirect to login screen
router.get("/", (req, res) => {
    res.redirect("users/login");
});


router.get("/register", (req, res) => {
    res.render("users/register");
});

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


module.exports = router;
