/* 
  File Name: questions.js
  Description: Handles operations related to questions, such as creating questions for ads,
               listing them for a specific user, retrieving questions by ID, and answering questions.
  Team's name: BOFC 
  Group number: 04
  Date: November 9, 2024
*/

// Import the models required to handle questions and ads
let QuestionModel = require('../models/question'); // Question model
let AdModel = require('../models/ads'); // Ad model for interacting with ads

// Function to create a new question for a specific ad
module.exports.create = async function (req, res, next) {
    try {
        console.log(req.body); // Log the request body for debugging
        const adID = req.params.adID; // Get the ad ID from request parameters
        console.log("Ad ID:", adID);
        const ad = await AdModel.findOne({ _id: adID }); // Find the ad by its ID
        if (!ad) {
            return res.status(404).json({
                success: false,
                message: "Ad not found"
            });
        }
        const ownerId = ad.owner; // Get the owner's ID of the ad
        console.log("Owner ID:", ownerId);

        // Create a new question and link it to the ad
        await QuestionModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            question: req.body.question,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            adID: adID,
            ownerAdID: ownerId
        });

        // Respond with success if the question is created successfully
        res.json({
            success: true,
            message: 'Question created successfully.'
        });
    } catch (error) {
        console.log(error); // Log any error for debugging
        next(error); // Pass the error to the error-handling middleware
    }
};

// Function to list all questions for the authenticated user
module.exports.list = async function (req, res, next) {
    try {
        const list = await QuestionModel.find({ ownerAdID: req.auth.id }); // Find questions based on authenticated user
        res.json(list); // Return the list of questions
    } catch (error) {
        console.log(error); // Log any error for debugging
        next(error); // Pass the error to the error-handling middleware
    }
};

// Function to retrieve a specific question by its ID
module.exports.questionByID = async function (req, res, next) {
    try {
        const questionID = req.params.questionID; // Get the question ID from request parameters
        console.log("Question ID:", questionID);
        const question = await QuestionModel.findOne({ _id: questionID }); // Find the question by its ID
        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        // Return the found question
        res.json(question);
    } catch (error) {
        console.log(error); // Log any error for debugging
        next(error); // Pass the error to the error-handling middleware
    }
};

// Function to answer a specific question
module.exports.answer = async function (req, res, next) {
    try {
        const questionID = req.params.questionID; // Get the question ID from request parameters
        const answerText = req.body.answer; // Get the answer text from the request body
        const question = await QuestionModel.findById(questionID); // Find the question by its ID
        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        // Check if the authenticated user is the owner of the ad linked to the question
        if (req.auth.id !== String(question.ownerAdID)) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to answer this question"
            });
        }

        // Update the question with the answer and answer date
        question.answer= answerText;
        question.answerDate= Date.now();
        await question.save();

        // Respond with success message and the updated question
        res.json({
            success: true,
            message: 'Answer updated successfully.',
            question
        });
    } catch (error) {
        console.log(error); // Log any error for debugging
        next(error); // Pass the error to the error-handling middleware
    }
};
