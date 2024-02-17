const { default: mongoose } = require("mongoose");

// Define the item schema
const itemSchema = new mongoose.Schema({
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
const orderSchema = new mongoose.Schema({
    // Array of items with itemSchema
    items: [itemSchema] // Array of items with itemSchema
}, {
	collection: 'order_collection'
});

const Orders = mongoose.model('order_collection',orderSchema)

module.exports = Orders