const productService = require('../auth/productService');
const kafkaProducer = require('../events/kafkaProducer');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;
        const product = await productService.createProduct(name, description, price, quantity);

        // Emit "Product Created" event to Kafka
        await kafkaProducer.emitProductCreatedEvent(product);

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateInventory = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const updatedProduct = await productService.updateInventory(productId, quantity);

        // Emit "Inventory Updated" event to Kafka
        await kafkaProducer.emitInventoryUpdatedEvent(updatedProduct);

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
