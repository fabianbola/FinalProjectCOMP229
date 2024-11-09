/* 
  File Name: ads.js
  Description: Controller file for handling CRUD operations on advertisement entries. 
               Defines methods to create, list, retrieve, update, disable, and delete ads 
               in the MongoDB database using the Ads model.   
  Team's name: BOFC 
  Group number: 04
  Date: November 9, 2024
*/

// Import the Ads model for database operations
let AdModel = require('../models/ads');

// Import the Users model for database operations
let UserModel = require('../models/users');


// Create a new ad entry in the database
module.exports.create = async function (req, res, next) {
    try {
        
        // Get the authenticated user's ID from the authorization data in the request
        const id = req.auth.id;

        // Construct new ad object from request data
        const newAd = new AdModel({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            owner: id,
            price: req.body.price
        });

        // Save the new ad to the database
        await AdModel.create(newAd);
        res.json(
            { success: true, 
                message: 'Ad created successfully.' 
            });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

// List all active ads, optionally filtering by category
module.exports.list = async function (req, res, next) {
    try {
        // Get category from request parameters
        const category = req.params.category;
        let ads;

      
        // Retrieve all active ads, filtering by category if specified according to the fields specifications.
        if (category === 'all') {
            
            ads = await AdModel.find({ isActive: true }, '-isActive -owner -created -updated'); //hidden fields
        } else {
            
            ads = await AdModel.find({ isActive: true, category: category }, '-isActive -owner -created -updated'); //hidden fields
        }

        if (!ads || ads.length === 0) {
            return res.status(404).json({ 
                message: "There are no active ads to display in the selected category." 
            });
        }

        // Send ads list as JSON response
        res.json(ads);
    } catch (error) {
        console.log(error);
        next(error);
    }
};


// List all ads created by the authenticated owner, active and inactive
module.exports.listByOwner = async function (req, res, next) {
    try {
        
        // Get category from request parameters
        const category = req.params.category;
        let ads;

        // Retrieve all ads of the user, filtering by category if specified according to the fields specifications.
        if (category === 'all') {
            
            ads = await AdModel.find({ owner: req.auth.id }, '-owner -created -updated'); //hidden fields
        } else {
            
            ads = await AdModel.find({ owner: req.auth.id , category: category }, '-owner -created -updated'); //hidden fields
        }

        if (!ads || ads.length === 0) {
            return res.status(404).json({ 
                message: "There are no ads created by the user to display in the selected category" 
            });
        }

        // Send ads list as JSON response
        res.json(ads);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
};


// List all ads in the database (admin permissions)
module.exports.listByAdmin = async function (req, res, next) {
    try {
        
        // Get the authenticated user's ID from the authorization data in the request
        const Uid = req.auth.id;

        const user = await UserModel.findOne({ _id: Uid });

        // Check if the authenticated user has admin privileges
        if (!user.admin) {
            return res.status(400).json({
                success: false,
                message: 'ERROR: Permision denied. User does not have the role to perform the action.'
            });
        }

        // Get category from request parameters
        const category = req.params.category;
        let ads;

        if (category === 'all') {
            
            ads = await AdModel.find({   }, '-created -updated'); //hidden fields
        } else {
            
            ads = await AdModel.find({ category: category }, '-created -updated'); //hidden fields
        }

        if (!ads || ads.length === 0) {
            return res.status(404).json({ 
                message: "There are no ads to display in the provided category" 
            });
        }

        // Send ads list as JSON response
        res.json(ads);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
};


// Get specific information of a single Active ad
module.exports.getAd = async function (req, res, next) {
    try {
        
        // Get ad ID from request parameters
        const id = req.params.id;
        
        // Retrieve active ad by ID
        req.ad = await AdModel.findOne({ _id: id, isActive: true}, '-isActive'); //hidden fields
        
        if (!req.ad) {
            return res.status(400).json({
                success: false,
                message: 'ERROR: There is no an active ad with the ID provided'
            });
            
        }

        res.json(req.ad);
        // next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Get specific information a single ad created by Owner
module.exports.getAdByOwner = async function (req, res, next) {
    try {
        
        // Get ad ID from request parameters
        const id = req.params.id;
       
        // Retrieve user's ad by ID 
        req.ad = await AdModel.findOne({ _id: id,owner: req.auth.id }, '-owner');
        
        if (!req.ad) {
            return res.status(400).json({
                success: false,
                message: 'ERROR: There is no an ad associated with the provided ID created by the user.'
            });
            
        }
        res.json(req.ad);
        // next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};


// Get  specific information of any single ad in the database (Admin)
module.exports.getAdByAdmin = async function (req, res, next) {
    try {
        
        // Get the authenticated user's ID from the authorization data in the request
        const Uid = req.auth.id;

        // Retrieve user by ID
        const user = await UserModel.findOne({ _id: Uid });

        if (!user.admin) {
            return res.status(400).json({
                success: false,
                message: 'ERROR: Permision denied. User does not have the role to perform the action.'
            });
        }
        
        // Get ad ID from request parameters
        const id = req.params.id;
        // Retrieve ad by ID
        req.ad = await AdModel.findOne({ _id: id});
        
        if (!req.ad) {
            return res.status(400).json({
                success: false,
                message: 'ERROR: There is no an ad associated with the provided ID.'
            });
            
        }
        res.json(req.ad);
        // next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};


// Update an ad (only if the user is the owner)
module.exports.update = async function (req, res, next) {
    try {
        // Get ad ID from request parameters
        const id = req.params.id;
        
         // Retrieve ad by ID
        const ad = await AdModel.findOne({ _id: id });

        if (!ad) {
            return res.status(404).json({
                success: false,
                message: 'Add not found.'
            });
        }
  
        if (ad.owner.toString() !== req.auth.id) {
            return res.status(400).json({
                success: false,
                message: 'ERROR: The user does not have the permissions to edit this ad. Only the creator can edit it.'
            });
        }   

        // Construct new ad object from request data
        const updatedAd = {
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            updated: Date.now()
        };

        // Submit the updated ad to the DB
        const result = await AdModel.updateOne(
            { _id: id, owner: req.auth.id }, // Filter by ad ID and owner ID
            updatedAd
        );
        console.log(result);

        // Check if the ad was updated
        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Item updated successfully."
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Item not updated. No changes were made. The ad might already have the same values or no updates were necessary.'
            });
        }
    } catch (error) {
        next(error);
    }
};


// Disable an ad (instead of deleting)
module.exports.disable = async function (req, res, next) {
    try {
        // Get ad ID from request parameters
        const id = req.params.id;

        // Update the 'isActive' field to false
        const result = await AdModel.updateOne(
            { _id: id, owner: req.auth.id },  // Ensure the ad belongs to the authenticated user
            { isActive: false }
        );

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: 'Ad disabled successfully.'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Ad not found or you do not have permission to disable this ad.'
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Delete a specific user entry from the database
module.exports.remove =  async function(req,res,next){
    try {
        
        // Get the authenticated user's ID from the authorization data in the request
        const Uid = req.auth.id;

         // Retrieve user by ID
        const user = await UserModel.findOne({ _id: Uid });

        // Verify admin privileges for the action
        if (!user.admin) {
            return res.status(400).json({
                success: false,
                message: 'ERROR: The user does not have the permissions to delete an ad.'
            });
        }

        // Get ad ID from request parameters
        let id = req.params.id;
        
        // Delete ad from database
        let result = await AdModel.deleteOne({_id: id});
         // Log the deletion result
        console.log(result);

        if(result.deletedCount>0){
            res.json({
                success: true,
                message: 'Ad deleted successfully'
            });

        } else{
            //Express will catch this on its own
            throw new Error('Ad not deleted. Are you sure it exists?');
            
        
    }
        
    } catch (error) {
        console.log(error);
        next(error);
    }
  };