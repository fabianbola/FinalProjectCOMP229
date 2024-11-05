const express = require('express');
const router = express.Router();

let userController = require('../controller/users');

router.get('/', function(req, res, next) {
    res.send('this is the API user - using rootes');
});

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUser);
router.get('/users/:id', userController.getUser, userController.userByID);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
