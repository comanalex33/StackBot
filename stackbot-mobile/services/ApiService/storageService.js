import api from "./api";

// GET requests
export const getHouses = () => api.get('/api/storages/houses');
export const getRooms = (houseId) => api.get(`/api/storages/${houseId}/rooms`)
export const getSubstorages = (roomId) => api.get(`/api/storages/${roomId}/substorages`)
export const getItemsByStorageName = (name) => api.get(`/api/storages/${name}/items`);

// POST requests
export const addStorage = (name, type, description, parentStorageName) => api.post('/api/storages', { name: name, type: type, description: description, parentStorageName: parentStorageName })

// PUT requests
export const updateStorage = (name, newName, newDescription) => api.put(`/api/storages/${name}`, {name: newName, description: newDescription})

// DELETE requests
export const deleteStorage = (name) => api.delete(`/api/storages/${name}`)
