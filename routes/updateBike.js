const Bikes = require('../models/bikes');

module.exports = async (req, res, next) => {
    try {
        const updatedBike = await Bikes.findByIdAndUpdate(req.body.productId, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity,
            image: req.body.image
        }); 

        if (!updatedBike) {
            return res.status(404).send('The bike with the given ID was not found.');
        }

        res.redirect('/inventory');
    } catch (ex) {
        next(ex);
    }
}