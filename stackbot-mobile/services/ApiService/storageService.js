import api from "./api";

// GET requests
export const getHouses = () => api.get('/houses');
export const getRooms = (houseId) => api.get(`/rooms/${houseId}`)
export const getSubstorages = (roomId) => api.get(`/substorages/${roomId}`)

// POST requests
export const addStorage = (name, type, description, parentStorageName) => api.post('/api/storages', { name: name, type: type, description: description, parentStorageName: parentStorageName })

// PUT requests
export const updateStorage = (name, newName, newDescription) => api.put(`/api/storages/${name}`, {name: newName, description: newDescription})

// DELETE requests
export const deleteStorage = (name) => api.delete(`/api/storages/${name}`)
