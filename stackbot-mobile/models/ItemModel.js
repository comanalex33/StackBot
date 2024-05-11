import BaseModel from "./BaseModel";

class ItemModel extends BaseModel {
    constructor({ id = null, name, description, count, warrantyDate = null, expirationDate = null, storageId } = {}) {
        super(id); // Call the constructor of the BaseModel
        this.name = name;
        this.description = description;
        this.count = count;
        this.warrantyDate = warrantyDate;
        this.expirationDate = expirationDate;
        this.storageId = storageId;
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

    getStorageId() {
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

    setStorageId(storageId) {
        this.storageId = storageId;
    }
}

export default ItemModel;
