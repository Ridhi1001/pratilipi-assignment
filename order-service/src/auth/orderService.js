const Order = require('../models/orderModel');

const createOrder = async (productId, userId, quantity) => {
    const newOrder = new Order({ productId, userId, quantity });
    return newOrder.save();
};

const getOrdersByUser = async (userId) => {
    return Order.find({ userId });
};

module.exports = {
    createOrder,
    getOrdersByUser,
};
