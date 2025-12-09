import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.escuelajs.co/api/v1';

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
}); 
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error)=> Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config || {};

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const storedRefresh = localStorage.getItem('refresh_token');
                if (!storedRefresh) {
                    throw new Error('No refresh token available');
                }
                const resp = await axios.post(`${BASE_URL}/auth/refresh-token`, {
                    refresh_token: storedRefresh,
                });
                const { access_token, refresh_token: newRefreshToken } = resp.data;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', newRefreshToken);

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
                return instance(originalRequest);
            } catch (refreshError) {
                console.error("session expired. Please login again.");
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user_data');

                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default instance;
