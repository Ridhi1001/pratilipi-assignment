const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/create', productController.createProduct);
router.post('/update-inventory', productController.updateInventory);

module.exports = router;
