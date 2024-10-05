const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const producer = new Producer(client);

producer.on('ready', () => console.log('Kafka Producer is ready'));

const emitEvent = (topic, payload) => {
    const message = [{ topic, messages: JSON.stringify(payload) }];
    producer.send(message, (err, data) => {
        if (err) {
            console.error(`Failed to send event to ${topic}:`, err);
        } else {
            console.log(`Event sent to ${topic}:`, data);
        }
    });
};


module.exports = emitEvent;
