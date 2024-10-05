const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
const kafkaConsumer = require('./events/kafkaConsumer');

const app = express();
app.use(express.json());

app.use('/orders', orderRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/orderdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
    kafkaConsumer.listenForEvents();
});
