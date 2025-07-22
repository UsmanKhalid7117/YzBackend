const express = require("express");
const brandController = require("../controllers/Brand");
const router = express.Router();

router
    .get("/", brandController.getAll)          // Get all brands
    .post("/", brandController.addBrand)       // Add new brand
    .put("/:id", brandController.updateBrand)  // Update brand by ID
    .delete("/:id", brandController.deleteBrand); // Delete brand by ID

module.exports = router;
