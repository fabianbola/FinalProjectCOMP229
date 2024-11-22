//Everyone base on the back-end method that the front-end is calling

class questionModel {

    constructor(firstName, lastName, question, email, phoneNumber, answer, createdDate, answerDate, adID, ownerAdID) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.question = question;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.answer = answer;
        this.createdDate = createdDate;
        this.answerDate = answerDate;
        this.adID = adID;
        this.ownerAdID = ownerAdID;
    }
}

export default questionModel;

