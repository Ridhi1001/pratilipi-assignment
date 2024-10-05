const { Kafka } = require('kafkajs');
const Product = require('../models/productModel');

const kafka = new Kafka({
    clientId: 'product-service',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'product-group' });

const listenForEvents = async () => {
    await consumer.connect();

    // Subscribe to the "order-placed" event
    await consumer.subscribe({ topic: 'order-placed', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            console.log(`Received message on topic ${topic}: ${message.value.toString()}`);

            if (topic === 'order-placed') {
                const order = JSON.parse(message.value.toString());
                await updateInventory(order.productId, order.quantity);
            }
        },
    });
};

const updateInventory = async (productId, quantity) => {
    try {
        const product = await Product.findById(productId);
        if (product && product.inventory >= quantity) {
            product.inventory -= quantity;
            await product.save();
            console.log(`Inventory updated for product: ${productId}, remaining stock: ${product.inventory}`);
        } else {
            console.log(`Insufficient stock for product: ${productId}`);
        }
    } catch (error) {
        console.error('Error updating inventory:', error);
    }
};

module.exports = {
    listenForEvents,
};
