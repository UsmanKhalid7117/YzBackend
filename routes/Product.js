const express = require('express');
const productController = require('../controllers/Product');
const router = express.Router();

const { getProductsByCategory } = productController;
const { getProductsByBrand } = productController;

router
  .post('/', productController.create)
  .get('/', productController.getAll)
  .get('/category/:categoryName', getProductsByCategory) // ✔️ correct position (before :id)
  .get('/brand/:brandName', getProductsByBrand)
  .get('/:id', productController.getById)
  .patch('/:id', productController.updateById)
  .patch('/undelete/:id', productController.undeleteById)
  .delete('/:id', productController.deleteById);

module.exports = router;
