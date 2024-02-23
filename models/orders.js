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
    },
    price: {
        type: Number,
        required: true
    }
});

// Define the main schema
const orderSchema = new mongoose.Schema({
    // Array of items with itemSchema
    items: [itemSchema],
    // customer reference
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_collection'    
    },
    // Add a createdAt field
    createdAt: {
        type: Date,
        default: Date.now
    }
    }, {
	    collection: 'order_collection'
});

const Orders = mongoose.model('order_collection',orderSchema)

module.exports = Orders