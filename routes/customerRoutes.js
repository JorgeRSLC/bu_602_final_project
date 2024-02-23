const express = require('express');
const displayProducts = require('./displayProducts');
const addToOrder = require('./addToOrder');
const orderSummary = require('./orderSummary');
const submitOrder = require('./submitOrder');
const displayOrders = require('./displayOrders');

const customerRouter = express.Router();

customerRouter.get('/', (req, res) => {
    // Handle the request
    res.redirect('/customer/products');
});

customerRouter.get('/products', displayProducts);
customerRouter.post('/add-to-order', addToOrder);
customerRouter.post('/order-summary', orderSummary);
customerRouter.post('/submit-order', submitOrder);
customerRouter.get('/orders-view', displayOrders);

module.exports = customerRouter;