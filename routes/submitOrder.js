const Order = require('../models/orders');

module.exports = async (req, res, next) =>{
    // Array to store extracted data
    const items = [];

    // Extract id and quantity for each item from the request body    
    req.body.items.forEach((item, index) => {
        const id = item.productId;
        // Get quantity from request body
        const quantity = item.quantity; 
        
        // Add id and quantity to the items array
        items.push({ 'productID':id, 'quantity':quantity });
    });

    let order = new Order({
        items:items
    })
    // Save the order to the database
    order.save()
    .then(savedOrder => {
        req.session.cart = [];
    })
    .catch(err => {
        console.error("Error saving order:", err);
    });
    
    res.redirect('/orders-view')
}