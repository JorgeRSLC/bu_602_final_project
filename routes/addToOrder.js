module.exports = (req, res) => {
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity); // Parse quantity to integer
    const price = parseFloat(req.body.price); // Parse price to float
    if (!req.session.cart) {
        req.session.cart = [];
    }
    const item = {
        'productID':productId,
        'quantity':quantity,
        'price': price
    }
    req.session.cart.push(item);

    res.redirect('/customer/products');
}