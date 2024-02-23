const express = require('express');
const inventory = require('./inventory');
const updateBike = require('./updateBike');
const addBike = require('./addBike');

const adminRouter = express.Router();

adminRouter.get('/inventory', inventory);
adminRouter.post('/update-product', updateBike);
adminRouter.get('/add-bike', (req, res) => {
    res.render('addBikeView');
});
adminRouter.post('/add-bike', addBike);

module.exports = adminRouter;