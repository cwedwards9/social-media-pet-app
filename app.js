const express = require("express");
const methodOverride = require("method-override");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");

const User = require("./models/User");

const URL = process.env.MONGODB_URI || "mongodb://localhost/petDB";

// Connecting to MongoDB
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log("Connected to MongoDB!"))
.catch(error => console.log(error.message));


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files in the public directory 
app.use(express.static("public"));
// Use ejs as as default template engine
app.set("view engine", "ejs");

//For 'time since created' functionality
app.locals.moment = require("moment");

// Initialize Passport and allow persistent login session
app.use(session({ secret: "thisisasupersecretsecretformyapp", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// Use local strategy, authentication method is on our user model (help from passport-local-mongoose)
passport.use(new LocalStrategy(User.authenticate()));

// Store user in session / Take user out of session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Use flash and set up a middleware for storing flash messages in session
app.use(flash());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Use method-override to allow for PUT/DELETE requests from our forms
app.use(methodOverride("_method"));

// Import and use routes
const userRoutes = require("./routes/users");
const petRoutes = require("./routes/pets");
const commentRoutes = require("./routes/comments");

app.use(userRoutes);
app.use(petRoutes);
app.use(commentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});