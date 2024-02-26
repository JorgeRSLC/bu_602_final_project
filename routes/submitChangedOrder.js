const Order = require('../models/orders');
const Bikes = require('../models/bikes');

module.exports = async (req, res, next) =>{
    // console.log('submitChangedOrder.js: req.body:', req.body);
    
    const orderID = req.params.id; 
    const updatedProducts = req.body.products;
    // console.log('submitChangedOrder.js: updatedProducts:', updatedProducts);
    
    const order = await Order.findById(orderID);
    const items = order.items;
    // console.log('submitChangedOrder.js: order:', order);
    
    // console.log('submitChangedOrder.js: items:', items);
    
    // orginal order quantities
    let originalQuantities = [];
    for(let item of items) {
        
        originalQuantities.push({id: item.productID, quantity: item.quantity});
    }
    //console.log('submitChangedOrder.js: originalQuantities:', originalQuantities);
    
    // for each item update its quantity and price
    for (let product of updatedProducts) {
        let item = items.find(item => item.productID === product.productID);
        if (item) {
            item.quantity = product.orderquantity;
            item.price = product.price;
        } else {
            console.error(`No item found with productID: ${product.productID}`);
        }
    }

    // save the updated order
    await order.save();

    // update inventory stock
    for (let item of items) {
        let originalQuantity = originalQuantities.find( x => x.id === item.productID);
        let difference = originalQuantity.quantity - item.quantity;
        let inventory = await Bikes.findById(item.productID);
        inventory.stockQuantity += difference;
        await inventory.save();
    }

    // get customer id
    const customerID = order.customer;

    // redirect to the customer review page
    res.redirect('/admin/review-orders/' + customerID);
}