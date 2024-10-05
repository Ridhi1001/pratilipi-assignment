const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const emitOrderPlacedEvent = async (order) => {
    await producer.connect();
    await producer.send({
        topic: 'order-placed',
        messages: [{ value: JSON.stringify(order) }],
    });
    await producer.disconnect();
};

module.exports = {
    emitOrderPlacedEvent,
};
