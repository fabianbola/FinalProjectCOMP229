var express = require('express');
var router = express.Router();

let questionsController = require('../controllers/questions');
let authController = require('../controllers/auth');

/* GET users listing. */
  router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create/:adID', questionsController.create);
router.get('/list', authController.requireSignin, questionsController.list);
router.get('/get/:questionID', authController.requireSignin, questionsController.questionByID);
router.put('/answer/:questionID', authController.requireSignin, questionsController.answer);
//router.get('/get/:questionID', questionsController.questionGet, questionsController.questionByID);
//router.put('/answer/:questionID', authController.requireSignin, questionsController.answer);
//router.delete('/delete/:userID', usersController.remove);

module.exports = router;