const express = require('express');
const inventory = require('./inventory');
const updateBike = require('./updateBike');
const addBike = require('./addBike');

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.render('adminConsoleView');
});

adminRouter.get('/update-inventory', inventory);
adminRouter.post('/update-product', updateBike);
adminRouter.get('/add-bike', (req, res) => {
    res.render('addBikeView');
});
adminRouter.post('/add-bike', addBike);

adminRouter.get('/review-customers', require('./customerReview'));
adminRouter.get('/review-orders/:id', require('./reviewOrders'));

adminRouter.get('/update-order/:id', require('./updateOrder'));
adminRouter.post('/update-order/:id', require('./submitChangedOrder'));

module.exports = adminRouter;