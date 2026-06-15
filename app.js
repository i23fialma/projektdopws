require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
const connectDB = require("./config/db");

// Načtení našich rout
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Použití rout
app.use("/", authRoutes);
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
    res.redirect("/books");
});

app.listen(PORT, () => {
    console.log(`Server běží na adrese http://localhost:${PORT}`);
});

