let AdModel = require('../models/ads');


// Create a new ad
module.exports.create = async function (req, res, next) {
    try {
        const id = req.auth.id;

        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const today = new Date();
        console.log(today);

        if(startDate >= today && endDate>= startDate){
        const newAd = new AdModel({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            owner: id,
            isActive: true,
        });

        await AdModel.create(newAd);
        res.json(
            { success: true, 
                message: 'Ad created successfully.' 
            });
        } else if(startDate < today) {
            res.status(400).json({
                success: false,
                message: 'ERROR: The start date must be later than the current date.'
            });
        } else if(endDate < startDate){
            res.status(400).json({
                success: false,
                message: 'ERROR: The end date must be later than the start date.'
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// List all active ads
module.exports.list = async function (req, res, next) {
    try {
        const category = req.params.category;
        let ads;

      
        if (category === 'all') {
            
            ads = await AdModel.find({ isActive: true });
        } else {
            
            ads = await AdModel.find({ isActive: true, category: category });
        }

        if (!ads || ads.length === 0) {
            return res.status(404).json({ 
                message: "There are no active ads to display in the provided category." 
            });
        }

        res.json(ads);
    } catch (error) {
        console.log(error);
        next(error);
    }
};


// List all ads by owner (active and inactive)
module.exports.listByOwner = async function (req, res, next) {
    try {
        
        const category = req.params.category;
        let ads;

        if (category === 'all') {
            
            ads = await AdModel.find({ owner: req.auth.id  });
        } else {
            
            ads = await AdModel.find({ owner: req.auth.id , category: category });
        }

        if (!ads || ads.length === 0) {
            return res.status(404).json({ 
                message: "There are no active ads created by the user to display in the provided category" 
            });
        }

        res.json(ads);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Get a single Active ad
module.exports.getAd = async function (req, res, next) {
    try {
        
        const id = req.params.id;
        req.ad = await AdModel.findOne({ _id: id, isActive: true, });
        
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

// Get a single ad by Owner (Active or Inactive)
module.exports.getAdByOwner = async function (req, res, next) {
    try {
        
        const id = req.params.id;
        req.ad = await AdModel.findOne({ _id: id,owner: req.auth.id });
        
        if (!req.ad) {
            return res.status(400).json({
                success: false,
                message: 'ERROR: There is no an ad associated with the provided ID that was created by the user.'
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
        const id = req.params.id;
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const today = new Date();
             
        const ad = await AdModel.findOne({ _id: id });

        if (!ad) {
            return res.status(404).json({
                success: false,
                message: 'Add not found.'
            });
        }

        
        if (ad.owner !== req.auth.id) {
            return res.status(400).json({
                success: false,
                message: 'ERROR: The user does not have the permissions to edit this ad. Only the creator can edit it.'
            });
        }   

    if (endDate>startDate && endDate>today){

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
    } else if (endDate < today){
        res.status(400).json({
            success: false,
            message: 'ERROR: The end date must be later than the current date. If the ad has already expired, please disable it.'
        });
    
    }else if (endDate < startDate){
        res.status(400).json({
            success: false,
            message: 'ERROR: The end date must be later than the start date.'
        });
    } 
    } catch (error) {
        next(error);
    }
};


// Disable an ad (instead of deleting)
module.exports.disable = async function (req, res, next) {
    try {
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
