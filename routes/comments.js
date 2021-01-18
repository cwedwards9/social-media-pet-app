const express = require("express");
const router = express.Router();
const db = require("../models");
const middleware = require("../middleware");

router.post("/pets/:id/comments", (req, res) => {
    const user = { id: req.user._id, username: req.user.username };
    db.Post.findById(req.params.id)
        .then(post => {
            db.Comment.create({...req.body, user: user})
                .then(comment => {
                    comment.save();
                    post.comments.push(comment._id);
                    post.save();
                    res.redirect('back');
                })
                .catch(err => {
                    console.log(err);
                });
        });
});


module.exports = router;