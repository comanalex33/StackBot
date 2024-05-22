import axios from "axios";

const aiApi = axios.create({
    baseURL: 'http://13.53.166.235',
    timeout: 1000
})

let interceptorId;

// Set up a method to attach the token
export const setAuthTokenForAI = token => {
    // Add a request interceptor and store its ID
    interceptorId = aiApi.interceptors.request.use(
        (config) => {
            // If the token exists, append it to the data
            if (token) {
                // For methods that typically carry a payload, append token to the data
                if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
                    if (config.data) {
                        config.data.token = token;
                    } else {
                        config.data = { token };
                    }
                }
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

// Set up a method to detach the token
export const unsetAuthTokenForAI = () => {
    if (interceptorId !== undefined) {
        aiApi.interceptors.request.eject(interceptorId);
        interceptorId = undefined;
    }
};

export default aiApi;
