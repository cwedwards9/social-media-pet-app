const express = require("express");
const router = express.Router();
const db = require("../models");

// INDEX route - show all pet posts
router.get("/pets", (req, res) => {
    db.Post.find({})
        .then(pets => {
            res.render("pets/index", {pets: pets});
        });
});


// NEW route - create a new post of your pet
router.get("/pets/new", (req, res) => {
    res.render("pets/new");
});


// SHOW route - display more info about the pet post
router.get("/pets/:id", (req, res) => {
    db.Post.findById(req.params.id)
        .populate("users")
        .then(foundPet => {
            res.render("pets/show", {pet: foundPet});
        });
});

module.exports = router;