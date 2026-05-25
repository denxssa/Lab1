import axios from 'axios';

/** How often open message views refetch from the API (ms). */
export const MESSAGES_POLL_MS = 4000;

export function listConversations() {
    return axios.get('/api/conversations').then((response) => response.data);
}

export function startConversation(payload) {
    return axios.post('/api/conversations', payload).then((response) => response.data);
}

export function listMessages(conversationId) {
    return axios.get(`/api/conversations/${conversationId}/messages`).then((response) => response.data);
}

export function sendMessage(conversationId, body) {
    return axios.post(`/api/conversations/${conversationId}/messages`, { body }).then((response) => response.data);
}
