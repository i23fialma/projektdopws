const Book = require("../models/Book");
exports.getAllBooks = async (req, res) => { const books = await Book.find().sort({ createdAt: -1 }); res.render("books/index", { books }); };
exports.getBookDetail = async (req, res) => { const book = await Book.findById(req.params.id); res.render("books/show", { book }); };
exports.showCreateForm = (req, res) => { res.render("books/create"); };
exports.createBook = async (req, res) => {
    const { title, author, pages, description, imageUrl } = req.body;
    let image = req.file ? req.file.filename : (imageUrl || "");
    await Book.create({ title, author, pages, description, image });
    res.redirect("/books");
};
exports.showEditForm = async (req, res) => { const book = await Book.findById(req.params.id); res.render("books/edit", { book }); };
exports.updateBook = async (req, res) => {
    const { title, author, pages, description, imageUrl } = req.body;
    let updateData = { title, author, pages, description };
    if (req.file) updateData.image = req.file.filename;
    else if (imageUrl) updateData.image = imageUrl;
    await Book.findByIdAndUpdate(req.params.id, updateData);
    res.redirect(`/books/${req.params.id}`);
};
exports.deleteBook = async (req, res) => { await Book.findByIdAndDelete(req.params.id); res.redirect("/books"); };