const Bike = require('../models/bikes');
const xmlbuilder = require('xmlbuilder');

module.exports = async (req, res) => {
    const format = req.headers.accept;
    let bikes = await Bike.find();

    // If no bikes are found, send a 404 response
    if (!bikes) {
        res.status(404).send('No bikes found');
        return;
    }
    // check if price query parameters are present
    if (req.query.lowerPrice && req.query.upperPrice) {
        bikes = bikes.filter(bike => {
            return bike.price >= req.query.lowerPrice && 
                bike.price <= req.query.upperPrice;
        });
    }
    if (format === 'application/json') {
        res.set('Content-Type', 'application/json');
        let catalog = {
            bikes: bikes.map(bike => {
                let bikeJson = bike.toJSON();
                delete bikeJson.image;
                delete bikeJson.__v;
                return bikeJson;
            })
        };
        res.json({'catalog': catalog});
    } else if (format === 'application/xml') {
        res.set('Content-Type', 'application/xml');
        // Create the root element
        let catalog = xmlbuilder.create('catalog');
        // Add each bike to the catalog
        bikes.forEach(bike => {
            let bikeJson = bike.toJSON();
            delete bikeJson.image;
            delete bikeJson.__v;
            // Add the bike to the catalog
            catalog.ele('bike', bikeJson);
        });

        // Convert the XML to a string
        let xmlString = catalog.end({ pretty: true });
        res.send(xmlString);
    } else {
        res.status(406).send('Not Acceptable');
    }
}