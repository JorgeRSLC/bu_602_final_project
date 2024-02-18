const Order = require('../models/orders');
const Bikes = require('../models/bikes');

module.exports = async (req, res, next) =>{
    // Array to store extracted data
    const items = [];

    // Extract id and quantity for each item from the request body    
    for (let item of req.body.items) {
        const id = item.productId;
        // Get quantity from request body
        const quantity = item.quantity; 

        // Fetch the current stockQuantity for the item from the Bikes model
        const bike = await Bikes.findOne({ _id: id });
        if (!bike) {
            console.error("Bike not found:", id);
            continue;
        }

        // Adjust the quantity ordered based on the stockQuantity
        let adjustedQuantity = quantity;
        if (quantity > bike.stockQuantity) {
            adjustedQuantity = bike.stockQuantity;
        }

        // Update the stockQuantity in the Bikes model
        bike.stockQuantity -= adjustedQuantity;
        if (bike.stockQuantity < 0) {
            bike.stockQuantity = 0;
        }
        await bike.save();

        // Add id and adjusted quantity to the items array
        items.push({ 'productID':id, 'quantity':adjustedQuantity });
    }

    let order = new Order({
        items:items
    })

    // Save the order to the database
    // Save the order to the database
    try {
        await order.save();
        // Clear the session cart after submitting the order
        req.session.cart = []; 
        res.redirect('/orders-view');
    } catch(err) {
        console.error("Error saving order:", err);
        res.status(500).send("Error saving order");
    }
}