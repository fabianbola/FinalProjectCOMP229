let QuestionModel = require('../models/question');
let AdModel = require('../models/ads');

// Crear una nueva pregunta
module.exports.create = async function (req, res, next) {
    try {
        console.log(req.body);
        const adID = req.params.adID;
        console.log("Ad ID:", adID);

        // Busca el anuncio para obtener el ID del propietario
        const ad = await AdModel.findOne({ _id: adID });
        if (!ad) {
            return res.status(404).json({
                success: false,
                message: "Ad not found"
            });
        }
        const ownerId = ad.owner;
        console.log("Owner ID:", ownerId);

        // Crea la pregunta
        await QuestionModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            question: req.body.question,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            addID: adID,
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

// Listar todas las preguntas para el usuario autenticado
module.exports.list = async function (req, res, next) {
    try {
        const list = await QuestionModel.find({ ownerAddID: req.auth.id });
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Obtener una pregunta específica por su ID
module.exports.questionByID = async function (req, res, next) {
    try {
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
// Responder a una pregunta
module.exports.answer = async function (req, res, next) {
    try {
        const questionID = req.params.questionID;
        const answerText = req.body.answer;

        // Buscar la pregunta por ID
        const question = await QuestionModel.findById(questionID);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        // Verificar si el usuario autenticado es el propietario del anuncio
        if (req.auth.id !== String(question.ownerAddID)) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to answer this question"
            });
        }

        // Actualizar la respuesta y la fecha de respuesta
        question.answer = answerText;
        question.answerDate = Date.now();
        await question.save();

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



/*
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

module.exports.list = async function (req, res, next) {
    try {
        let list = await QuestionModel.find({_id: req.auth.id});
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.questionByID = async function (req, res, next) {
    try {
        let questID = req.params.questionID;
        console.log(questID);
        await QuestionModel.findOne({ _id: questID });
        req.question = await QuestionModel.findOne({ _id: uID });
        res.json(req.question);
    } catch (error) {
        console.log(error);
        next(error);
    }

}
*/








/*
module.exports.update = async function (req, res, next) {
    try {
        let questionID = req.params.adID;

        let updateQuestion = new UserModel(req.body);
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
*/







/*
module.exports.userByID = async function (req, res, next) {
    res.json(req.user);
}
*/



/*

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