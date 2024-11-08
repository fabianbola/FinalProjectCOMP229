var express = require('express');
var router = express.Router();

const adsController = require('../controllers/ads');
const authController = require('../controllers/auth');


// List all active ads (requires login)
//router.get('/myUser/list/:category', authController.requireSignin, adsController.listByOwner);

// List all active ads (publicly accessible)
router.get('/list/:category', adsController.list);

// Create a new ad (requires login)
router.post('/myUser/create', authController.requireSignin, adsController.create);

// Update an ad (requires login)
router.put('/myUser/edit/:id', authController.requireSignin, adsController.update);

// Disable an ad (requires login)
router.put('/myUser/disable/:id', authController.requireSignin, adsController.disable);

// Get the information of an ad (requires login)
router.get('/myUser/get/:id', authController.requireSignin, adsController.getAdByOwner);

// Get the information of an ad (publicly accessible)
router.get('/get/:id', adsController.getAd);

module.exports = router;