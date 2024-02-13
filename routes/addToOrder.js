module.exports = (req, res) => {
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity); // Parse quantity to integer
    if (!req.session.cart) {
        req.session.cart = [];
    }
    const item = {
        'productID':productId,
        'quantity':quantity
    }
    req.session.cart.push(item);
    res.redirect('/products');
}