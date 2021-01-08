const express = require("express");
const app = express();
const mongoose = require("mongoose");


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

// Import and use routes
const indexRoutes = require("./routes/index");
const petsRoutes = require("./routes/pets");

app.use(indexRoutes);
app.use(petsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});