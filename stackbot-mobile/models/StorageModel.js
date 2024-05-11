import BaseModel from "./BaseModel";

class StorageModel extends BaseModel {
    constructor({ id = null, name, type, description, storageId = null } = {}) {
        super(id); // Call the constructor of the BaseModel
        this.name = name;
        this.type = type;
        this.description = description;
        this.storageId = storageId;
    }

    // Getter methods
    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    getDescription() {
        return this.description;
    }

    getStorageId() {
        return this.storageId;
    }

    // Setter methods
    setName(name) {
        this.name = name;
    }

    setType(type) {
        this.type = type;
    }

    setDescription(description) {
        this.description = description;
    }

    setStorageId(storageId) {
        this.storageId = storageId;
    }
}

export default StorageModel;
