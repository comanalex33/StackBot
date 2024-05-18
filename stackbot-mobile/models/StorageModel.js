import BaseModel from "./BaseModel";

class StorageModel extends BaseModel {
    constructor({ id = null, name, type, description, parentStorageId = null } = {}) {
        super(id); // Call the constructor of the BaseModel
        this.name = name;
        this.type = type;
        this.description = description;
        this.parentStorageId = parentStorageId;
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

    getParentStorageId() {
        return this.parentStorageId;
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

    setParentStorageId(parentStorageId) {
        this.parentStorageId = parentStorageId;
    }
}

export default StorageModel;
