const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.showRegister = (req, res) => {
    res.render("auth/register");
};

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.send("Uživatel už existuje");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        username,
        password: hashedPassword,
        role: "user"
    });
    res.redirect("/login");
};

exports.showLogin = (req, res) => {
    res.render("auth/login");
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.send("Uživatel neexistuje");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.send("Špatné heslo");
    }
    req.session.user = {
        id: user._id,
        username: user.username,
        role: user.role
    };
    res.redirect("/books");
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};