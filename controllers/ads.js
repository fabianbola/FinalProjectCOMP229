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
                message: 'ERROR: Start date must be higher than actual date'
            });
        } else if(endDate < startDate){
            res.status(400).json({
                success: false,
                message: 'ERROR: End date must be higher than start date'
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
        res.json(req.ad);
        next();
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
        res.json(req.ad);
        next();
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
        const today = Date.now();

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
                message: 'Item not updated. Are you sure it exists and you have permission to edit it?'
            });
        }
    } else if (endDate < today){
        res.status(400).json({
            success: false,
            message: 'ERROR: End date must be higher than today date. In case the ad expired arleady please disable it.'
        });
    } else if (endDate < startDate){
        res.status(400).json({
            success: false,
            message: 'ERROR: End date must be higher than start date'
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
