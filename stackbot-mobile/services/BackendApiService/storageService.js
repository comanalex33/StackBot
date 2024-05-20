import backendApi from "./backendApi";

// GET requests
export const getHouses = () => backendApi.get('/api/storages/houses');
export const getRooms = (houseId) => backendApi.get(`/api/storages/${houseId}/rooms`)
export const getSubstorages = (roomId) => backendApi.get(`/api/storages/${roomId}/substorages`)
export const getItemsByStorageName = (name) => backendApi.get(`/api/storages/${name}/items`);

// POST requests
export const addStorage = (name, type, description, parentStorageName) => backendApi.post('/api/storages', { name: name, type: type, description: description, parentStorageName: parentStorageName })

// PUT requests
export const updateStorage = (name, newName, newDescription) => backendApi.put(`/api/storages/${name}`, {name: newName, description: newDescription})

// DELETE requests
export const deleteStorage = (name) => backendApi.delete(`/api/storages/${name}`)
