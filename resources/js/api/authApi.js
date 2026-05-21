import axios from 'axios';

const TOKEN_KEY = 'auth_token';

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    delete axios.defaults.headers.common['Authorization'];
}

// Restore token on page load
const stored = getToken();
if (stored) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${stored}`;
}

export function register(payload) {
    return axios.post('/auth/register', payload).then((res) => {
        setToken(res.data.token);
        return res.data;
    });
}

export function login(payload) {
    return axios.post('/auth/login', payload).then((res) => {
        setToken(res.data.token);
        return res.data;
    });
}

export function logout() {
    return axios.post('/auth/logout')
        .then((res) => res.data)
        .finally(() => removeToken());
}

export function getCurrentUser() {
    if (!getToken()) {
        return Promise.reject(new Error('No token'));
    }
    return axios.get('/auth/user').then((res) => res.data);
}

export function refreshToken() {
    return axios.post('/auth/refresh').then((res) => {
        setToken(res.data.token);
        return res.data;
    });
}
