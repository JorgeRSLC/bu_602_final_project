// Importing Mongoose library for MongoDB interactions
const mongoose = require('mongoose'); 

// Creating a schema for the "customer" document
let userSchema = new mongoose.Schema({
	firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }}
    , { 
        collection: 'user_collection' 
    });

const User = mongoose.model('user_collection',userSchema)

module.exports = User