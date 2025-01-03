import axios from 'axios';

const AUTH_API = '/api/auth';

const authService = {
    async login(email, password) {
        const response = await axios.post(`${AUTH_API}/login`, { email, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    async register(username, email, password) {
        return await axios.post(`${AUTH_API}/register`, {
            username,
            email,
            password
        });
    },

    logout() {
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
};

export default authService; 