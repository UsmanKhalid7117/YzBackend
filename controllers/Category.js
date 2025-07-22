const Category = require("../models/Category");

// Create a new category
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating category" });
  }
};

// Get all categories
exports.getAll = async (req, res) => {
  try {
    const result = await Category.find({});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

// Get category by ID
exports.getById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching category" });
  }
};

// Update category
exports.update = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updatedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating category" });
  }
};

// Delete category
exports.delete = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting category" });
  }
};
