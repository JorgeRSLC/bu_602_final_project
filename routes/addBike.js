// Import Bikes model
const Bikes = require('../models/bikes');
// Export a function that handles bike creation
module.exports = async (req, res, next) => {
    const bike = new Bikes({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stockQuantity: req.body.stockQuantity,
        image: req.body.image
    });
    
    // Save the new bike to the database
    await bike.save();
    // Redirect to the inventory update page
    res.redirect('/admin/update-inventory');
}