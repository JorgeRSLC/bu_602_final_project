const ShopDB = require('../shopDB.js')
const Bike = ShopDB.getBikeModel();

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

    res.render('productsView', { products: results });
};
