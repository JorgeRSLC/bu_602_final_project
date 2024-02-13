const ShopDB = require('../shopDB.js')
const Order = ShopDB.getOrderModel();

module.exports = async (req, res, next) =>{
    // Array to store extracted data
    const items = [];

    // Extract id and quantity for each item from the request body
    req.body.items.forEach((item, index) => {
        const id = item.productId;
        // Get quantity from request body
        const quantity = req.body[`quantity${index}`]; 

        // Add id and quantity to the items array
        items.push({ 'productId':id, 'quantity':quantity });
    });
}