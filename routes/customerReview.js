// import User model
const User = require('../models/user'); 
// Description: This file contains the routes for the customer review page.
module.exports = async (req, res) => {
    // Get all users from the database
    try {
        const user = await User.find({ role: { $ne: 'admin' } });
        let message = '';
        let results = user.map(user =>{
            return{
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
        
        if(results.length === 0){
            message = 'No customers found.'
        }
        res.render('customerReviewView', { message:message, users: results });
    }catch(err) {
        console.error(err);
        res.render('500', 'Internal server error encountered at customer review.');
    }

};