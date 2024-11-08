var express = require('express');
var router = express.Router();
let usersController = require('../controllers/users');
let authController = require('../controllers/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', authController.signin);
router.post('/myuser/signout/:userID', usersController.signout);
//router.get('/list', usersController.list); // List all users DELETE THIS LINE
router.post('/create', usersController.create); // Create a new user DONE
//router.get('/get/:userID', usersController.userGet, usersController.userByID); // Get a user by ID  DELETE THIS LINE
router.put('/edit/:userID', authController.requireSignin,usersController.update); // Update a user DONE
router.delete('/delete/:userID', usersController.remove); // Delete a user

module.exports = router;
