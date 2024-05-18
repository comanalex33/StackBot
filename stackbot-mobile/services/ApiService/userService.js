import api from "./api";

export const login = (email, password) => api.post('/api/users/login', {email: email, password: password});
