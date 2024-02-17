const Orders = require('../models/orders');
const Bikes = require('../models/bikes');

module.exports = async function (req, res, next) {
    try {
        // Retrieve all orders
        const allOrders = await Orders.find({});

        // Array to store the result
        const orderDetails = [];

        // Loop through each order
        for (const order of allOrders) {
            // Extract orderID
            const orderID = order._id;

            // Array to store product names and quantities
            const products = [];

            // Loop through each item in the order
            for (const item of order.items) {
                // Find the corresponding product in the bike collection
                const bike = await Bikes.findOne({ _id: item.productID });

                // If bike found, add its name and quantity to the products array
                if (bike) {
                    products.push({
                        name: bike.name,
                        quantity: item.quantity
                    });
                }
            }

            // Add orderID and products to the orderDetails array
            orderDetails.push({
                orderID: orderID,
                products: products
            });
        }

        // Render the ordersView with orderDetails data
        res.render('ordersView', { orderDetails: orderDetails });
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
}
