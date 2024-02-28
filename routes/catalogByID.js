const Bike = require('../models/bikes');
const xmlbuilder = require('xmlbuilder');

module.exports = async (req, res) => {
    const format = req.headers.accept;
    const bike = await Bike.findById(req.params.id);
    
    if (!bike) {
        res.status(404).send('Bike not found');
        return;
    }

    if (format === 'application/json') {
        res.set('Content-Type', 'application/json');
        let bikeJson = bike.toJSON();
        delete bikeJson.image;
        delete bikeJson.__v;
        res.json({'bike': bikeJson});
    } else if (format === 'application/xml') {
        res.set('Content-Type', 'application/xml');
        let bikeJson = bike.toJSON();
        delete bikeJson.image;
        delete bikeJson.__v;
        // Create the root element
        let bikeElement = xmlbuilder.create('bike');
        // Add properties to the bike element
        for (let prop in bikeJson) {
            bikeElement.ele(prop, bikeJson[prop]);
        }
        // Convert the XML to a string
        let xmlString = bikeElement.end({ pretty: true });
        res.send(xmlString);
    } else {
        res.status(406).send('Not Acceptable');
    }
}