const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const kafkaConsumer = require('./events/kafkaConsumer');

const app = express();
app.use(express.json());

app.use('/products', productRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
    kafkaConsumer.listenForEvents();
});
