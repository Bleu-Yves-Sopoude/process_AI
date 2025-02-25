const user = require('../model/user')
const getUserProfile = async(req, res) =>{
    const user = await user.findById(req.user.id).select('-password');
    res.json(user);

};

const getAllusers = async(req,res) =>{
    const users =await User.find.select('-password');
    res.json(users);
}

module.exports ={getUserProfile, getAllusers};