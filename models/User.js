const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema ({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: "Username is required"
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        trim: true,
        required: "Password is required",
        // validate: {
        //     minLength: [5, "Password is too weak"],
        //     maxLength: [20, "Password is too long"]
        // }
    },
    bio: {
        type: String,
        trim: true,
        // validate: {
        //     maxLength: 200
        // }
    },
    userCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);