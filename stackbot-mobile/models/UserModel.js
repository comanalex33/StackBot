import BaseModel from "./BaseModel";

class UserModel extends BaseModel {
    constructor({ id = null, email, firstName, lastName, password } = {}) {
        super(id); // Call the constructor of the BaseModel
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    // Getter methods
    getEmail() {
        return this.email;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getName() {
        return this.lastName + " " + this.firstName
    }

    getPassword() {
        return this.password;
    }

    // Setter methods
    setEmail(email) {
        this.email = email;
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }

    setPassword(password) {
        this.password = password;
    }
}

export default UserModel;
