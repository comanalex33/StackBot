import axios from "axios";

const api = axios.create({
    baseURL: 'http://13.51.249.39',
    timeout: 1000
})

// Set up a method to attach the token
export const setAuthToken = token => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Set up a method to detach the token
export const unsetAuthToken = () => {
    delete api.defaults.headers.common['Authorization'];
}

export default api;
