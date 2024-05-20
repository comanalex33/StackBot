import backendApi from "./backendApi";

export const login = (email, password) => backendApi.post('/api/users/login', {email: email, password: password});
export const register = (firstName, lastName, email, password) => backendApi.post('/api/users/register', {firstName: firstName, lastName: lastName, email: email, password: password});
