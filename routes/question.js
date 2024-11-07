var express = require('express');
var router = express.Router();

let questionsController = require('../controllers/questions');
let authController = require('../controllers/auth');

/* GET users listing. */
  router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



//router.get('/list', authController.requireSignin, questionsController.list);
router.post('/create/:adID', questionsController.create);
//router.get('/get/:questionID', questionsController.questionGet, questionsController.questionByID);
//router.put('/answer/:questionID', authController.requireSignin, questionsController.answer);
//router.delete('/delete/:userID', usersController.remove);

module.exports = router;



/*
var express = require('express');
var router = express.Router();
let questionsController = require('../controllers/questions');
let authController = require('../controllers/auth');

// Enviar pregunta (anónimo)
router.post('/create/:adID', questionsController.create);

// Responder pregunta (solo usuario autenticado y dueño del anuncio)
router.put('/answer/:questionID', authController.requireSignin, questionsController.answer);

module.exports = router;
*/