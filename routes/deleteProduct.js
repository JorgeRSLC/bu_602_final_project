const Bike = require('../models/bikes');

module.exports = async (req, res) => {
    const { id } = req.params;
    await Bike.findByIdAndDelete(id); 
    res.redirect('/admin/update-inventory');
}
