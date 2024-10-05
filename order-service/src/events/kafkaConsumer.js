const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'order-group' });

const listenForEvents = async () => {
    await consumer.connect();

    await consumer.subscribe({ topic: 'product-created', fromBeginning: true });
    await consumer.subscribe({ topic: 'user-registered', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            console.log(`Received message on topic ${topic}: ${message.value.toString()}`);
        },
    });
};

module.exports = {
    listenForEvents,
};
