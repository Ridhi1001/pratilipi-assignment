const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'product-service',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const emitProductCreatedEvent = async (product) => {
    await producer.connect();
    await producer.send({
        topic: 'product-created',
        messages: [{ value: JSON.stringify(product) }],
    });
    await producer.disconnect();
};

const emitInventoryUpdatedEvent = async (product) => {
    await producer.connect();
    await producer.send({
        topic: 'inventory-updated',
        messages: [{ value: JSON.stringify(product) }],
    });
    await producer.disconnect();
};

module.exports = {
    emitProductCreatedEvent,
    emitInventoryUpdatedEvent,
};
