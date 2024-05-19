import api from "./api";

export const getItemsByStorageName = (name) => api.get(`/api/items/items/${name}`);
