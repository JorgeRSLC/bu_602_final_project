const Orders = require('../models/orders');
const Bikes = require('../models/bikes');

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

let dateFormatter = (orderDate) => {
    // Create a new Date object from orderDate
    let date = new Date(orderDate);

    // Extract the day, month, and year
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    let year = date.getFullYear();

    // Combine the day, month, and year into the desired format
    let formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}

module.exports = async function (req, res, next) {
    try {        
        // Retrieve all orders
        const allOrders = await Orders.find({customer: req.params.id});

        // Array to store the result
        const orderDetails = [];

        // Loop through each order
        for (const order of allOrders) {
            // Extract orderID
            const orderID = order._id;
            // Extract order creation date
            const orderDate = order.createdAt;
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
                        quantity: item.quantity,
                        price: formatter.format(item.price)
                    });
                }
            }

            // Add orderID and products to the orderDetails array
            orderDetails.push({
                orderID: orderID,
                products: products,
                date: dateFormatter(orderDate)
            });
        }
        let message = '';
        if (orderDetails.length === 0) {
            message = 'No orders found';
        }

        let firstName = '';
        // check if req.query.name is defined
        if (req.query.name === undefined) {
            // if not, get from User model with id
            const User = require('../models/user');
            const user = await User.findById(req.params.id);
            firstName = user.firstName;
        }else{
            // if defined, use the value
            firstName = req.query.name;
        }
        // Render the ordersView with orderDetails data
        res.render('reviewOrdersView', { message:message, name: firstName, 
            orderDetails: orderDetails });
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
}
