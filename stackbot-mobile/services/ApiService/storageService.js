import api from "./api";

export const getHouses = () => api.get('/houses');
export const getRooms = (houseId) => api.get(`/rooms/${houseId}`)
