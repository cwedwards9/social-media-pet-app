const express = require("express");
const router = express.Router();
const db = require("../models");
const middleware = require("../middleware");

// INDEX route - show all pet posts
router.get("/pets", (req, res) => {
    db.Post.find({})
        .populate("user")
        .then(pets => {
            res.render("pets/index", {posts: pets});
        });
});


// NEW route - create a new post of your pet
router.get("/pets/new", middleware.isLoggedIn, (req, res) => {
    res.render("pets/new");
});

// CREATE route - add a new post to the database
router.post("/pets", middleware.isLoggedIn, (req, res) => {
    const user = { id: req.user._id, username: req.user.username };
    db.Post.create({...req.body, user: user})
        .then(newPost => {
            console.log(newPost);
            res.redirect("/pets");
        })
        .catch(err => {
            console.log(err);
        });
});


// SHOW route - display more info about the pet post
router.get("/pets/:id", middleware.isLoggedIn, (req, res) => {
    db.Post.findById(req.params.id)
        .populate("user")
        .then(foundPetPost => {
            res.render("pets/show", {post: foundPetPost});
        });
});


// EDIT route - display edit form for a post
router.get("/pets/:id/edit", middleware.isLoggedIn, (req, res) => {
    db.Post.findById(req.params.id)
        .then(foundPetPost => {
            res.render("pets/edit", {post: foundPetPost});
        })
});

// UPDATE route - update a post
router.put("/pets/:id", middleware.isLoggedIn, (req, res) => {
    db.Post.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.redirect(`/pets/${req.params.id}`);
        })
});


// DELETE route - delete a post
router.delete("/pets/:id", middleware.isLoggedIn, (req, res) => {
    db.Post.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/pets");
        })
});

module.exports = router;