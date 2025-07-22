const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Import your models
const Brand = require('./Brand');
const Category = require('./Category');

// Your MongoDB connection string
const MONGO_URL = process.env.MONGO_URI;

// Default categories and brands
const defaultCategories = ['Accessories', 'Smartphones', 'Laptops', 'SmartWatches', 'Earbuds'];
const defaultBrands = ["Redmi", "Tecno", "Itel", "Oppo", "Infinix", "Samsung", "HP", "Lenovo", "Dell"];

async function insertDefaults() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB connected.");

    // Insert categories if not exist
    for (const name of defaultCategories) {
      const exists = await Category.findOne({ name });
      if (!exists) {
        await Category.create({ name });
        console.log(`📂 Category added: ${name}`);
      }
    }

    // Insert brands if not exist
    for (const name of defaultBrands) {
      const exists = await Brand.findOne({ name });
      if (!exists) {
        await Brand.create({ name });
        console.log(`🏷️ Brand added: ${name}`);
      }
    }

    console.log("🌱 Default categories and brands seeded.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

insertDefaults();
