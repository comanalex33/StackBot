import axios from "axios";

const backendApi = axios.create({
    baseURL: 'http://13.51.249.39',
    timeout: 1000
})

// Set up a method to attach the token
export const setAuthToken = token => {
    if (token) {
        backendApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete backendApi.defaults.headers.common['Authorization'];
    }
};

// Set up a method to detach the token
export const unsetAuthToken = () => {
    delete backendApi.defaults.headers.common['Authorization'];
}

export default backendApi;
