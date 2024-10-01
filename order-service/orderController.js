// orderController.js
const placeOrder = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    // Place order and save it to the database

    // Emit "Order Placed" event
    eventBus.emit('Order Placed', { orderId: newOrder.id, productId, quantity });

    res.json(newOrder);
};
