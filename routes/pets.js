const express = require("express");
const router = express.Router();

router.get("/pets", (req, res) => {
    res.render("pets/index");
});


module.exports = router;