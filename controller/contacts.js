const contactModel = require('../models/contact');

// Create a new contact
module.exports.createContact = async function (req, res, next) {
    let contact = new contactModel(req.body);
    let result = await contactModel.create(contact);

    res.json({ 
        success: true,
        message: 'Contact created successfully',
        data: result 
    });
}


// Get all contacts
module.exports.getAllContacts = async function (req, res, next) {
    try {
        let list = await contactModel.find({});
        res.json(list);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

// Get contact by id
module.exports.getContact = async function (req, res, next) {
    try {
        let uID = req.params.id;
        req.contac = await contactModel.findOne({_id: uID}); 
        next();
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

module.exports.contactByID = async function (req, res, next) {
    res.json(req.contac);
}


module.exports.updateContact = async function (req, res, next) {
    try {
        let uID = req.params.id;
        let updateContact = new contactModel(req.body);
        updateContact._id = uID;
        let result = await contactModel.updateOne({_id:uID}, updateContact);
        console.log('Update result:', result);
        if (result.modifiedCount > 0) {
            res.json({ 
                success: true,
                message: 'contact updated successfully',
                data: result
            });
        } else {
            throw new Error('contact not found. Are you sure it exists?');
        }
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

module.exports.deleteContact = async function (req, res, next) {
    try {
        let uID = req.params.id;

        let result = await contactModel.deleteOne({ _id: uID });
        if (result.deletedCount > 0) {
            res.json(
                {
                    success: true,
                    message: 'Contact deleted successfully.'
                }
            );
        } else {
            throw new Error('Contact not deleted. Are you sure it exists?')
        }
    }
    catch(err){
        console.log(err);
        next(err);
    }
}