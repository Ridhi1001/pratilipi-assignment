const orderService = require('../auth/orderService');
const kafkaProducer = require('../events/kafkaProducer');

exports.placeOrder = async (req, res) => {
    try {
        const { productId, userId, quantity } = req.body;
        const order = await orderService.createOrder(productId, userId, quantity);

        // Emit "Order Placed" event to Kafka
        await kafkaProducer.emitOrderPlacedEvent(order);

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await orderService.getOrdersByUser(userId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
