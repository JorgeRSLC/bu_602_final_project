const Order = require('../models/orders');
const Bikes = require('../models/bikes');

module.exports = async (req, res, next) =>{
    // Get order from request parameters
    const orderID = req.params.id;

    // Get the order from the database
    const order = await Order.findById(orderID);

    const products = []

    // for each item in the order get the productID and quantity
    for (let item of order.items) {
        let inventory = await Bikes.findById(item.productID);
        let name = inventory.name;
        let currentQuantity = inventory.stockQuantity;
        let product = {'productID':item.productID, 'name':name,
                'orderquantity':item.quantity, 'price':item.price,
                'currentQuantity':currentQuantity}
        products.push(product)
    }
    
    const orderDetails = {
        orderID: orderID,
        products: products
    }
    res.render('updateOrder', orderDetails);
}