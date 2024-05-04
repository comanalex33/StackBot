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
}

export default BaseModel;
