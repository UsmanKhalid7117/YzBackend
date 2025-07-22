const express = require("express");
const categoryController = require("../controllers/Category");
const router = express.Router();

// CREATE a new category
router.post("/", categoryController.create);

// READ all categories
router.get("/", categoryController.getAll);

// READ single category by ID
router.get("/:id", categoryController.getById);

// UPDATE category by ID
router.put("/:id", categoryController.update);

// DELETE category by ID
router.delete("/:id", categoryController.delete);

module.exports = router;
