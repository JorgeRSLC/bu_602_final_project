const Order = require('../models/orders');
const Bike = require('../models/bikes');
// Description: This function deletes an order from the database and
// updates the stock of the products in the order.
module.exports = async (req, res) => {
    // Get order from request parameters
    const orderID = req.params.id;
    
    // Get the order from the database
    const deletedOrder = await Order.findOneAndDelete({ _id: orderID });
    
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
    
    // redirect to the reviewOrders page
    res.redirect('/admin/review-orders/' + customer);
}
