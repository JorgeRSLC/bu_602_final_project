const User = require('../models/user');

module.exports = async (req, res) => {
    // Create a new user with the data from the form
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        role: 'customer' // All new users are created as customers
    });

    try {
        // Save the new user to the database
        let savedUser = await newUser.save();
        // Save user ID in session
        if(!req.session.user) {
            req.session.user = {};
        }
        req.session.user = savedUser._id; 
        res.redirect('/products');

    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering new user please try again.');
    }
};