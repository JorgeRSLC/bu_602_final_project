const express = require('express');

// supporting modules
const displayProducts = require('./displayProducts');
const addToOrder = require('./addToOrder');
const orderSummary = require('./orderSummary')
const submitOrder = require('./submitOrder')
const inventory = require('./inventory')
const updateBike = require('./updateBike')


require('../db')

const router = express.Router();

// link to cookie middleware
const { credentials } = require('../config')
const cookieParser = require('cookie-parser')
router.use(cookieParser(credentials.cookieSecret))

// link to session middleware
const expressSession = require('express-session');

router.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}))

router.get('/', function(req, res, next) {
    res.redirect('/products');
});

router.get('/products', displayProducts);

// Route to handle adding items to the order
router.post('/add-to-order', addToOrder);

// Route to handle reviewing ordered items
router.post('/order-summary', orderSummary)

// Route to handle submitting orders
router.post('/submit-order',submitOrder)

//Route to handle displaying orders
router.get('/orders-view', require('./displayOrders'))

router.get('/inventory', inventory)

router.post('/update-product', updateBike)

module.exports = router;
