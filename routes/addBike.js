const Bikes = require('../models/bikes');

module.exports = async (req, res, next) => {
    const bike = new Bikes({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stockQuantity: req.body.stockQuantity,
        image: req.body.image
    });
    await bike.save();
    res.redirect('/inventory');
}