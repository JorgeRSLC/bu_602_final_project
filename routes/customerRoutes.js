// Description: This file contains the routes for the customer console view.
const express = require('express');

const customerRouter = express.Router();
// Description: This route renders the customer console view.
customerRouter.get('/', (req, res) => {
    // render the customer console view
    res.render('customerConsoleView');
});
// Routes for managing the customer's interaction with the store
customerRouter.get('/products', require('./displayProducts'));
customerRouter.post('/add-to-order', require('./addToOrder'));
customerRouter.post('/order-summary', require('./orderSummary'));
customerRouter.post('/submit-order', require('./submitOrder'));
customerRouter.get('/orders-view', require('./displayOrders'));

module.exports = customerRouter;