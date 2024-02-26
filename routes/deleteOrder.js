const Order = require('../models/orders');
const Bike = require('../models/bikes');

module.exports = async (req, res) => {
    // Get order from request parameters
    const orderID = req.params.id;
    
    // Get the order from the database
    const deletedOrder = await Order.findOneAndDelete({ _id: orderID });
    console.log('order:', deletedOrder);
    
    let bikes = [];
    for(let item of deletedOrder.items) {
        bikes.push({ id: item.productID, quantity: item.quantity });
    }

    // update the stock
    for(let bike of bikes) {
        let product = await Bike.findById(bike.id);
        product.stockQuantity += bike.quantity;
        await product.save();
    }
    // get user ID from order
    const customer = deletedOrder.customer;
    console.log('customer:', customer);
    
    // redirect to the reviewOrders page
    res.redirect('/admin/review-orders/' + customer);
}
