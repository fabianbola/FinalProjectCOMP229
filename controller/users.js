const userModel = require('../models/user');

// Create a new user
module.exports.createUser = async function (req, res, next) {
    let user = new userModel(req.body);
    let result = await userModel.create(user);

    res.json({ 
        success: true,
        message: 'User created successfully',
        data: result 
    });
}


// Get all user
module.exports.getAllUser = async function (req, res, next) {
    try {
        let list = await userModel.find({}, '-password');
        res.json(list);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

// Get user by id
module.exports.getUser = async function (req, res, next) {
    try {
        let uID  = req.params.id;
        req.user = await userModel.findOne({_id: uID}), '-password';
        next();
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

module.exports.userByID = async function(req,res,next){
    res.json(req.user);
  }


module.exports.updateUser = async function (req, res, next) {
    try {
        let uID = req.params.id;
        let updateUser = new userModel(req.body);
        updateUser._id = uID;
        let result = await userModel.updateOne({_id:uID}, updateUser);
        console.log('Update result:', result);
        if (result.modifiedCount > 0) {
            res.json({ 
                success: true,
                message: 'user updated successfully',
                data: result
            });
        } else {
            throw new Error('user not found. Are you sure it exists?');
        }
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

module.exports.deleteUser = async function (req, res, next) {
    try {
        let uID = req.params.id;
        let result = await userModel.deleteOne({ _id: uID });
        if (result.deletedCount > 0) {
            res.json(
                {
                    success: true,
                    message: 'user deleted successfully.'
                }
            );
        } else {
            throw new Error('user not deleted. Are you sure it exists?')
        }
    }
    catch(err){
        console.log(err);
        next(err);
    }
}