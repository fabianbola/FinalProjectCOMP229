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

    email: {
    type: String,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
    required: 'Email is required'},

    phoneNumber: {
      type: Number,
      required: 'phone number is required',
      trim: true},

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
      /*owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }*/
    ad: {  
      type: Schema.Types.ObjectId, 
      ref: 'Ad', 
      required: true }
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





/*
const QuestionSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    question: { type: String, required: true },
    answer: String,
    ad: { type: Schema.Types.ObjectId, ref: 'Ad', required: true },  // Asociación con anuncio
    createdDate: { type: Date, default: Date.now, immutable: true },
    answerDate: { type: Date }
}, {
    collection: "questions"
});
*/