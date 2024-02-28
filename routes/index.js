const express = require('express');

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
// main login route
router.get('/', function(req, res, next) {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('loginView');
});

router.post('/login', require('./login'));

// register route
router.get('/register', (req, res) => {
    res.render('registerView');
});

router.post('/register', require('./register'));

router.use('/customer', require('./customerRoutes'));
router.use('/admin', require('./adminRoutes'));

router.use('/rest', require('./restRouter'));

router.use((req, res) => {
    res.render('404');
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.render('500', {error: err});
});

module.exports = router;
