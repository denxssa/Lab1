import axios from 'axios';

export function register(payload) {
    return axios.post('/auth/register', payload).then((response) => response.data);
}

export function login(payload) {
    return axios.post('/auth/login', payload).then((response) => response.data);
}

export function logout() {
    return axios.post('/auth/logout').then((response) => response.data);
}

export function getCurrentUser() {
    return axios.get('/auth/user').then((response) => response.data);
}
