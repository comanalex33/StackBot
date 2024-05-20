import backendApi from "./backendApi";

// POST requests
export const addItem = (name, count, description, storageName, expirationDate, warrantyDate) => backendApi.post('/api/items', {
    name: name,
    count: count,
    description: description,
    storageName: storageName,
    expirationDate: expirationDate,
    warrantyDate: warrantyDate
});

// PUT requests
export const updateItem = (name, newName, newCount, newDescription, newExpirationDate, newWarrantyDate) => backendApi.put(`/api/items/${name}`, {
    name: newName,
    count: newCount,
    description: newDescription,
    expirationDate: newExpirationDate,
    warrantyDate: newWarrantyDate
})

export const deleteItem = (name) => backendApi.delete(`/api/items/${name}`)
