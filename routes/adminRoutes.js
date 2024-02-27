// import express
const express = require('express');
// Description: This file contains the routes for the admin console.
const adminRouter = express.Router();
// Set root route to render admin console view
adminRouter.get('/', (req, res) => {
    res.render('adminConsoleView');
});
// Set routes for updating inventory, adding a bike, and deleting a product
adminRouter.get('/update-inventory', require('./inventory'));
adminRouter.post('/update-product', require('./updateBike'));
adminRouter.get('/add-bike', (req, res) => {
    res.render('addBikeView');
});
adminRouter.post('/add-bike', require('./addBike'));
adminRouter.post('/delete-product/:id', require('./deleteProduct'));

adminRouter.get('/review-customers', require('./customerReview'));
adminRouter.get('/review-orders/:id', require('./reviewOrders'));

adminRouter.get('/update-order/:id', require('./updateOrder'));
adminRouter.post('/update-order/:id', require('./submitChangedOrder'));

adminRouter.get('/delete-order/:id', require('./deleteOrder'));
// Export the adminRouter
module.exports = adminRouter;