// Importing Mongoose library for MongoDB interactions
const mongoose = require('mongoose'); 

// Creating a schema for the "bike" document
let Schema = mongoose.Schema;
let bikeSchema = new mongoose.Schema({
	name: String,
    description: String,
    price: Number,
    stockQuantity: Number,
    image: String // URL string
}, {
    // Specifying the collection name for the schema
	collection: 'bike_collection' 
});

const Bikes = mongoose.model('bike_collection',bikeSchema)

module.exports = Bikes