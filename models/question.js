const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    firstName:{
      type: String,
      required: 'first name is required',
      trim: true},

      lastName:{
        type: String,
        required: 'last name is required',
        trim: true},

    question: {
      type: String,
      required: 'question  is required',},

    answer: String,
    createdDate: {
        type: Date,
        default: Date.now,
        immutable: true
      },
    answerDate: {
        type: Date,
        default: Date.now,
        immutable: true
      },
},
{
    collection: "questions"
}
);

QuestionSchema.virtual('fullName')
  .get(function () {
    return this.firstName + ' ' + this.lastName;
  })
  .set(function (fullName) {
    let splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
  });

module.exports = mongoose.model('Question', QuestionSchema);