const User = require('../models/user'); // Assuming you have a User model

module.exports = async (req, res) => {
    // Assuming username unique and used for login
    const username = req.body.username; 
    const password = req.body.password;

    try {
        const user = await User.findOne({ username: username });
 
        if (!user) {
            res.render('loginView',
            {
                message1: 'User not found.',
                message2: 'Please try again, or register as new customer'
            });
        } else if(user.role === 'admin') {
            // redirect to admin page
        }
        else {
            if (password !== user.password) {
                res.render('loginView',
                {
                    message1: 'Incorrect password.',
                    message2: 'Please try again, or register as new customer'
                });
                return;
            }
            else {
                if(!req.session.user) {
                    req.session.user = {};
                }
                req.session.user = user._id; 
                    // Check the user's role and redirect them to the appropriate route
                if (user.role === 'admin') {
                    res.redirect('/admin');
                } else {                    
                    res.redirect('/customer');
                }
            }
        }
    } catch (err) {
        console.error(err);
        res.render('500','Internal server error encountered at login.');
    }
};