const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema ({
    title: {
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
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Post", PostSchema);