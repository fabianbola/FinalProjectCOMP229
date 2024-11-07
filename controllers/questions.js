let QuestionModel = require('../models/question');
let inventoryModel = require('../models/inventory');


module.exports.create = async function (req, res, next) {
    try {
        console.log(req.body);
        let idAddParams = req.params.adID;
        console.log(idAddParams);    
        let ownerBD = await inventoryModel.findOne({ _id: idAddParams });
        console.log(ownerBD);  
        let ownerId = ownerBD.owner;
        console.log(ownerId);

        await QuestionModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            question: req.body.question,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            addID: idAddParams,
            ownerAddID: ownerId
        });
        res.json({
            success: true,
            message: 'Question created successfully.'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/*
module.exports.list = async function (req, res, next) {
    try {
        let list = await QuestionModel.find({});
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
*/


/*
module.exports.userGet = async function (req, res, next) {
    try {
        let uID = req.params.userID;

        req.user = await UserModel.findOne({ _id: uID }, '-password');
        next();

    } catch (error) {
        console.log(error);
        next(error);
    }

}
*/
/*
module.exports.userByID = async function (req, res, next) {
    res.json(req.user);
}
*/



/*
module.exports.update = async function (req, res, next) {
    try {
        let uID = req.params.userID;

        let updateUser = new UserModel(req.body);
        updateUser._id = uID;

        let result = await UserModel.updateOne(
            { _id: uID },
            {
            firstName: updateUser.firstName,
            lastName: updateUser.lastName,
            email: updateUser.email,
            password: updateUser.password,
            updated: Date.now()
            }
);
        console.log(result);

        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: 'User updated successfully.'
                }
            );
        } else {
            // Express will catch this on its own.
            throw new Error('User not updated. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.remove = async function (req, res, next) {
    try {
        let uID = req.params.userID;

        let result = await UserModel.deleteOne({ _id: uID });
        console.log(result);

        if (result.deletedCount > 0) {
            res.json(
                {
                    success: true,
                    message: 'User deleted successfully.'
                }
            );
        } else {
            // Express will catch this on its own.
            throw new Error('User not deleted. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}
*/









/*
let QuestionModel = require('../models/question');

module.exports.create = async function (req, res, next) {
    try {
        let newQuestion = new QuestionModel({
            ...req.body,
            ad: req.params.adID  // Asociar pregunta al anuncio
        });

        await QuestionModel.create(newQuestion);
        res.json({
            success: true,
            message: 'Question submitted successfully.'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.answer = async function (req, res, next) {
    try {
        let questionID = req.params.questionID;
        let question = await QuestionModel.findOne({ _id: questionID }).populate('ad');

        if (!question || question.ad.postedBy.toString() !== req.user._id.toString()) {
            throw new Error("Question not found or you don't have permission to answer");
        }

        question.answer = req.body.answer;
        question.answerDate = Date.now();
        await question.save();

        res.json({
            success: true,
            message: 'Answer posted successfully.'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
*/