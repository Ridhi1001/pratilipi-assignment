const Product = require('../models/productModel');

const createProduct = async (name, description, price, quantity) => {
    const newProduct = new Product({ name, description, price, quantity });
    return newProduct.save();
};

const updateInventory = async (productId, quantity) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    product.quantity = quantity;
    return product.save();
};

module.exports = {
    createProduct,
    updateInventory,
};
