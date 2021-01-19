const express = require("express");
const router = express.Router();
const db = require("../models");
const middleware = require("../middleware");

router.post("/pets/:id/comments", middleware.isLoggedIn, (req, res) => {
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
                    res.redirect("back");
                });
        });
});


router.delete("/pets/:id/comments/:comment_id", middleware.isCommentOwner, (req, res) => {
    db.Comment.findByIdAndDelete(req.params.comment_id)
        .then(() => {
            req.flash("success", "Comment successfully deleted!");
            res.redirect(`/pets/${req.params.id}`);
        })
        .catch(err => {
            res.redirect("back");
        });
});


module.exports = router;