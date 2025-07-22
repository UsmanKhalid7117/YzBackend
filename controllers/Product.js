const Category = require("../models/Category");
const Product=require("../models/Product");
const Brand = require('../models/Brand'); 

exports.create=async(req,res)=>{
    try {
        const created=new Product(req.body)
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error adding product, please trying again later'})
    }
}

exports.getAll = async (req, res) => {
  try {
    const filter = {};

    // 👇 Deletion filter (default: show non-deleted only)
    if (req.query.isDeleted !== undefined) {
      filter.isDeleted = req.query.isDeleted === 'true';
    } else {
      filter.isDeleted = false;
    }

    // ✅ Sorting
    const sortField = req.query.sort || 'createdAt'; // default sorting field
    const sortOrder = req.query.order === 'asc' ? 1 : -1;
    const sort = { [sortField]: sortOrder };

    // ✅ Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalCount = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("brand", "name")
      .populate("category", "name");

    res.status(200).json({
      data: products,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};


exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        const result=await Product.findById(id).populate("brand").populate("category")
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting product details, please try again later'})
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Product.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating product, please try again later'})
    }
}

exports.undeleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const unDeleted=await Product.findByIdAndUpdate(id,{isDeleted:false},{new:true}).populate('brand')
        res.status(200).json(unDeleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error restoring product, please try again later'})
    }
}

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id).populate("brand");

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product permanently deleted", data: deleted });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting product, please try again later" });
  }
};


// controllers/Product.js
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    // Step 1: Find the category by name
    const category = await Category.findOne({
  name: { $regex: `^${categoryName}$`, $options: "i" },
});
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Step 2: Find products by category ObjectId
    const products = await Product.find({
      category: category._id,
      isDeleted: false,
    })
      .populate("brand", "name")
      .populate("category", "name");

    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// controllers/productController.js

exports.getProductsByBrand = async (req, res) => {
  try {
    const { brandName } = req.params;

    // 🔍 Debug logs
    console.log("Requested brandName:", brandName);

    // Step 1: Find the brand by name (case-insensitive)
    const brand = await Brand.findOne({
      name: { $regex: `^${brandName}$`, $options: "i" },
    });

    console.log("Found brand:", brand); // ✅ Should show brand object or null

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Step 2: Find products by brand ObjectId
    const products = await Product.find({
      brand: brand._id,
      isDeleted: false,
    })
      .populate("brand", "name")
      .populate("category", "name");

    console.log("Found products:", products); // ✅ Check if products are fetched

    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Error fetching products by brand:", err);
    res.status(500).json({ message: "Server error" });
  }
};

