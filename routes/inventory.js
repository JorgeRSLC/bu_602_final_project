const Bike = require('../models/bikes');

module.exports = async (req, res, next) => {
   
    let bikes = await Bike.find({})

    let results = bikes.map(bike =>{
        return{
            id: bike._id,
            name: bike.name,
            description: bike.description,
            price: bike.price,
            stockQuantity: bike.stockQuantity,
            image: bike.image
        }
    })
    res.render('inventoryView', { products: results});
};