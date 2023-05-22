export default class {
    constructor(id = undefined, firstName, lastName, email, password, favourites = [], reviews = []) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.favourites = favourites;
        this.reviews = reviews;
    }
}
