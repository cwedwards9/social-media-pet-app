const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Create User schema, passport-local-mongoose will add a username, and hashed password
const UserSchema = new mongoose.Schema ({
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    ownerName: {
        type: String,
        trim: true,
    },
    petName: {
        type: String,
        trim: true,
        required: true
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

// Add on methods to use for authentication
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);