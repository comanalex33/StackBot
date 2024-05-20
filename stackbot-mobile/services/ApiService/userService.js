import api from "./api";

export const login = (email, password) => api.post('/api/users/login', {email: email, password: password});
export const register = (firstName, lastName, email, password) => api.post('/api/users/register', {firstName: firstName, lastName: lastName, email: email, password: password});
