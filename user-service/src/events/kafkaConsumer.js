const kafka = require('kafka-node');

const kafkaConsumer = () => {
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
    const consumer = new Consumer(client, [{ topic: 'OrderPlaced' }], { autoCommit: true });

    consumer.on('message', (message) => {
        const event = JSON.parse(message.value);
        console.log(`Received message from ${message.topic}:`, event);
    });

    consumer.on('error', (err) => {
        console.error('Error in Kafka Consumer:', err);
    });
};

module.exports = kafkaConsumer;
