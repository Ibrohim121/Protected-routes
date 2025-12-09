import instance from "@/lib/axios";

const authService = {
    login: async (email, password) => {
        return await instance.post('/auth/login', { email, password });
    },
    getProfile: async () => {
        return await instance.get('/auth/profile');
    },
    register: async (userData) => {
        return await instance.post('/auth/register', userData);
    }
};
export default authService; 