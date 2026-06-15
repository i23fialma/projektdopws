const express = require("express");
const router = express.Router();
const multer = require("multer");
const bookController = require("../controllers/bookController");
const requireLogin = require("../middlewares/authMiddleware");
const upload = multer({ dest: "public/uploads/" });

router.get("/", bookController.getAllBooks);
router.get("/create", requireLogin, bookController.showCreateForm);
router.post("/", requireLogin, upload.single("image"), bookController.createBook);
router.get("/:id/edit", requireLogin, bookController.showEditForm);
router.put("/:id", requireLogin, upload.single("image"), bookController.updateBook);
router.delete("/:id", requireLogin, bookController.deleteBook);
router.get("/:id", bookController.getBookDetail);
module.exports = router;