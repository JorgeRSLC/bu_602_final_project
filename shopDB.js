// This code defines a module that exports a function to retrieve a Mongoose 
// model representing an "Employee" document in a MongoDB database.
// It uses the Mongoose library for interacting with MongoDB.

// Importing required modules
// Importing Mongoose library for MongoDB interactions
const mongoose = require('mongoose'); 
// Importing credentials module to get connection details
const creds = require("./credentials.js"); 

// Constructing the MongoDB connection URL using the credentials
const dbUrl = creds.protocol + creds.user + ':' + creds.password +
			'@' + creds.cluster + '/' + creds.database + creds.queryParam;

// Declaring variables for database connection and model
let connection = null;
let model = null;

// Creating a schema for the "bike" document
let Schema = mongoose.Schema;
let bikeSchema = new Schema({
	name: String,
    description: String,
    price: Number,
    stockQuantity: Number,
    image: String // URL string
}, {
	collection: 'bike_collection' // Specifying the collection name for the schema
});

;

// Define the item schema
const itemSchema = new Schema({
    productID: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

// Define the main schema
const orderSchema = new Schema({
    items: [itemSchema] // Array of items with itemSchema
});

// Exporting a function to retrieve the Mongoose model
module.exports = {
	getBikeModel: () => {
		// If connection is not established, create a new connection and model
		if (connection == null) {
			console.log("Creating connection and model...");
			// Creating a new connection to MongoDB using the connection URL
			connection = mongoose.createConnection(dbUrl, 
                { });
			// Creating a Mongoose model based on the employee schema
			model = connection.model("BikeModel", bikeSchema);
		};
		// Return the Mongoose model
		return model;
	},

	getOrderModel: ()=>{
		// If connection is not established, create a new connection and model
		if (connection == null) {
			console.log("Creating connection and model...");
			// Creating a new connection to MongoDB using the connection URL
			connection = mongoose.createConnection(dbUrl, 
                { });
			// Creating a Mongoose model based on the employee schema
			model = connection.model("OrdereModel", orderSchema);
		};
		// Return the Mongoose model
		return model;
	}
}