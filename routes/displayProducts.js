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
    const cart = req.session.cart || [];
    let cartCount = 0;
    cart.forEach(item => {
        cartCount += item.quantity;
    });
    res.render('productsView', { products: results, count: cartCount});
};
