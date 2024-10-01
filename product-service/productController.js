// productController.js
const createProduct = async (req, res) => {
    const { name, price, stock } = req.body;

    // Save product to the database
    const product = await Product.create({ name, price, stock });

    // Emit "Product Created" event
    eventBus.emit('Product Created', { productId: product.id });

    res.json(product);
};

const updateInventory = async (productId, quantity) => {
    // Update stock after an order is placed
    const product = await Product.findByPk(productId);
    product.stock -= quantity;
    await product.save();

    // Emit "Inventory Updated" event
    eventBus.emit('Inventory Updated', { productId, stock: product.stock });
};
