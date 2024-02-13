// import neccessary modules
const express = require('express')
const { engine: expressHandlebars } = require('express-handlebars');

// instantiate express app
const app = express();

// setup handlebars view engine
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine','handlebars')

//static resources
app.use(express.static(__dirname+'/public'))

// parse JSON bodies
app.use(express.json())

// parse URL-encoded bodies
app.use(express.urlencoded({extended:true}))

// Routing
// Importing and using the routes defiend in routes/index.js
const routes = require('./routes/index')
app.use('/', routes)

// Middleware to handle requests that reach this point but do
// match defined routes
app.use(function(req,res){
    // set the HTTP status code to 404 (Not Found)
    res.status(404)
    // render the '404' view using a templating enginer
    res.render('404')
})

// start the server on port 3000
app.listen(3000,function(){
    console.log('http://localhost');
    
})