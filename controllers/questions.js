let QuestionModel = require('../models/question');
let AdModel = require('../models/ads');

// Create a new question
module.exports.create = async function (req, res, next) {
    try {
        console.log(req.body);
        const adID = req.params.adID;
        console.log("Ad ID:", adID);
        const ad = await AdModel.findOne({ _id: adID });
        if (!ad) {
            return res.status(404).json({
                success: false,
                message: "Ad not found"
            });
        }
        const ownerId = ad.owner;
        console.log("Owner ID:", ownerId);
        await QuestionModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            question: req.body.question,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            adID: adID,
            ownerAdID: ownerId
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

// List the question of the user authenticated
module.exports.list = async function (req, res, next) {
    try {
        const list = await QuestionModel.find({ ownerAdID: req.auth.id });
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Pick a question by its ID
module.exports.questionByID = async function (req, res, next) {
    try {
        const adID = req.params.adID;
        const ad = await AdModel.findOne({ _id: adID });
        if (!ad) {
            return res.status(404).json({
                success: false,
                message: "Ad not found"
            });
        }
        const questionID = req.params.questionID;
        console.log("Question ID:", questionID);
        const question = await QuestionModel.findOne({ _id: questionID });
        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }
        res.json(question);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
// Answer the question
module.exports.answer = async function (req, res, next) {
    try {
        const questionID = req.params.questionID;
        const answerText = req.body.answer;
        const question = await QuestionModel.findById(questionID);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }
        if (req.auth.id !== String(question.ownerAdID)) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to answer this question"
            });
        }

        // Update the question to add the answer
        await UserModel.updateOne({ _id: questionID },
            {
                answer: answerText,
                answerDate: Date.now()
            })
        res.json({
            success: true,
            message: 'Answer updated successfully.',
            question
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};