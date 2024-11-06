var express = require('express');
var router = express.Router();

let questionsController = require('../controllers/questions');
let authController = require('../controllers/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/*
router.get('/list', authController.requireSignin, questionsController.list);
router.post('/create', questionsController.create);
router.get('/get/:questionID', questionsController.questionGet, questionsController.questionByID);
router.put('/edit/:questionID', authController.requireSignin,questionsController.update);
//router.delete('/delete/:userID', usersController.remove);
*/
module.exports = router;