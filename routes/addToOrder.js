// Export a function that adds an item to the order
module.exports = (req, res) => {
    // Get the product ID, quantity, and price from the request body
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity); // Parse quantity to integer
    const price = parseFloat(req.body.price); // Parse price to float
    // If the cart does not exist, create it
    if (!req.session.cart) {
        req.session.cart = [];
    }
    // Create an item object with the product ID, quantity, and price
    const item = {
        'productID':productId,
        'quantity':quantity,
        'price': price
    }
    // Add the item to the cart
    req.session.cart.push(item);
    // Redirect to the products page
    res.redirect('/customer/products');
}