const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema ({
    caption: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Post", PostSchema);