const express = require('express');
const router = express.Router();

let contactController = require('../controller/contacts');

router.get('/', function(req, res, next) {
    res.send('this is the API contact - using rootes');
});
router.post('/contacts', contactController.createContact);
router.get('/contacts', contactController.getAllContacts);
router.get('/contacts/:id', contactController.getContact, contactController.contactByID);
router.put('/contacts/:id', contactController.updateContact);
router.delete('/contacts/:id', contactController.deleteContact);

module.exports = router;
