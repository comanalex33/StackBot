class BaseModel {
    constructor(id = null) {
        this.id = id;
    }

    // Getter method for id
    getId() {
        return this.id;
    }

    // Setter method for id
    setId(id) {
        this.id = id;
    }

    // Method to return all properties except id
    getPropertiesWithoutId() {
        const properties = { ...this };
        delete properties.id;
        return properties;
    }

    // Custom method to compare two objects of any subclass of BaseClass
    isEqual(other) {
        // Check if the other object is an instance of the same class
        if (!(other instanceof this.constructor)) {
            return false;
        }

        // Compare properties of both objects
        // Implement your specific comparison logic here
        // For demonstration purposes, let's assume the objects are equal if all properties match
        for (let key in this) {
            if (this.hasOwnProperty(key) && this[key] !== other[key]) {
                return false;
            }
        }
        return true;
    }
}

export default BaseModel;
