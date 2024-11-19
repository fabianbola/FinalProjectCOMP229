//Everyone base on the back-end method that the front-end is calling//Everyone base on the back-end method that the front-end is calling

class userModel {

    constructor(firstName, lastName, email, username, hashed_password, salt, created, updated, admin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.hashed_password = hashed_password;
        this.salt = salt;
        this.created = created;
        this.updated = updated;
        this.admin = admin;
    }
}

export default userModel;