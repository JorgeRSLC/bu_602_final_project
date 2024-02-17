const Bike = require('../models/bikes');

module.exports = async (req, res, next) => {
    // declare cart values
    let cartValues = null;
    let itemsIDs = null;

    // Check if 'cart' exists in the session
    if (req.session.cart) {
        // Extract values from 'cart'
        cartValues = req.session.cart;
        itemsIDs = cartValues.map(item => item.productID)
    } else {
        res.status(404).json({ error: 'Cart not found in session' });
    }
    

    let bikes = await Bike.find({_id:{$in:itemsIDs}})
    
    let results = bikes.map(bike =>{
        return{
            id: bike._id,
            name: bike.name,
            description: bike.description,
            price: bike.price,
            image: bike.image
        }
    })

    updateQuantities(results,cartValues)
    
    res.render('orderSummaryView', { items: results });
    
};

// Update quantities
function updateQuantities(results, cart) {
    // Iterate over each object in the first array
    results.forEach((resultItem) => {
        // Find a matching object in the second array
        const matchingObj = cart.find(cartItem => 
                cartItem.productID === resultItem.id.toString());
        // If a match is found, add 'quan' field to the object in the first array
        if (matchingObj) {
            resultItem.quantity = matchingObj.quantity;
        }
    });
}