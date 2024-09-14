import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
    withCredentials: true,
    withXSRFToken: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('AuthToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;