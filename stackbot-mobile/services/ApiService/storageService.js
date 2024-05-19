import api from "./api";

export const getHouses = () => api.get('/houses');
export const getRooms = (houseId) => api.get(`/rooms/${houseId}`)
export const getSubstorages = (roomId) => api.get(`/substorages/${roomId}`)
