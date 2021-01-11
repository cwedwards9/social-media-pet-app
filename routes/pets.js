const express = require("express");
const router = express.Router();
const db = require("../models");

// INDEX route - show all pet posts
router.get("/pets", (req, res) => {
    db.Post.find({})
        .then(pets => {
            res.render("pets/index", {posts: pets});
        });
});


// NEW route - create a new post of your pet
router.get("/pets/new", (req, res) => {
    res.render("pets/new");
});

// CREATE route - add a new post to the database
router.post("/pets", (req, res) => {
    db.Post.create(req.body)
        .then(() => {
            res.redirect("/pets");
        })
});


// SHOW route - display more info about the pet post
router.get("/pets/:id", (req, res) => {
    db.Post.findById(req.params.id)
        .then(foundPetPost => {
            res.render("pets/show", {post: foundPetPost});
        });
});


// EDIT route - display edit form for a post
router.get("/pets/:id/edit", (req, res) => {
    db.Post.findById(req.params.id)
        .then(foundPetPost => {
            res.render("pets/edit", {post: foundPetPost});
        })
});

// UPDATE route - update a post
router.put("/pets/:id", (req, res) => {
    db.Post.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.redirect(`/pets/${req.params.id}`);
        })
});


// DELETE route - delete a post
router.delete("/pets/:id", (req, res) => {
    db.Post.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/pets");
        })
});

module.exports = router;