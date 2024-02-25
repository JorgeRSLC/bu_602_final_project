const User = require('../models/user'); 

module.exports = async (req, res) => {
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