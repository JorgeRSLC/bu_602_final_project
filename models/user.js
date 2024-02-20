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
    address:{
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true }, 
        zip: { type: Number, required: true }
    },
    email: {
        type: String,
        required: true  

    },
    phone: {
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

const Customer= mongoose.model('user_collection',userSchema)

module.exports = Customer