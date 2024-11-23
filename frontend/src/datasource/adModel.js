//Everyone base on the back-end method that the front-end is calling

class adModel {

    constructor(title, description, category, owner, userName, price, isActive, startDate, endDate, message, created, updated, collection) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.owner = owner;
        this.userName = userName;
        this.price = price;
        this.isActive = isActive;
        this.startDate = startDate;
        this.endDate = endDate;
        this.message = message;
        this.created = created;
        this.updated = updated;
        this.collection = collection;
    }
}

export default adModel;

