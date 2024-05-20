import BaseModel from "./BaseModel";

class ItemModel extends BaseModel {
    constructor({ id = null, name, description, count, warrantyDate = null, expirationDate = null, parentStorageId = null } = {}) {
        super(id); // Call the constructor of the BaseModel
        this.name = name;
        this.description = description;
        this.count = count;
        this.warrantyDate = warrantyDate;
        this.expirationDate = expirationDate;
        this.parentStorageId = parentStorageId;
    }

    // Getter methods
    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getCount() {
        return this.count;
    }

    getWarrantyDate() {
        return this.warrantyDate;
    }

    getExpirationDate() {
        return this.expirationDate;
    }

    getParentStorageId() {
        return this.storageId;
    }

    // Setter methods
    setName(name) {
        this.name = name;
    }

    setDescription(description) {
        this.description = description;
    }

    setCount(count) {
        this.count = count;
    }

    setWarrantyDate(warrantyDate) {
        this.warrantyDate = warrantyDate;
    }

    setExpirationDate(expirationDate) {
        this.expirationDate = expirationDate;
    }

    setParentStorageId(parentStorageId) {
        this.parentStorageId = parentStorageId;
    }
}

export default ItemModel;
