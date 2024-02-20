const express = require('express');

// supporting modules
const displayProducts = require('./displayProducts');
const addToOrder = require('./addToOrder');
const orderSummary = require('./orderSummary')
const submitOrder = require('./submitOrder')
const inventory = require('./inventory')
const updateBike = require('./updateBike')
const addBike = require('./addBike')


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
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('loginView');
});

router.get('/register', (req, res) => {
    res.render('registerView');
});

router.post('/login', require('./login'));

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

router.get('/add-bike', (req, res) => {
    res.render('addBikeView')
});

router.post('/add-bike', addBike)

module.exports = router;
