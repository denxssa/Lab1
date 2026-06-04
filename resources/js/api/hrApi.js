import axios from 'axios';

// ── Applications (HR) ─────────────────────────────────────────────────────────

export function fetchHrApplications() {
    return axios.get('/api/hr/applications').then((r) => r.data.applications);
}

export function updateHrApplicationStatus(id, status) {
    return axios.put(`/api/hr/applications/${id}`, { status }).then((r) => r.data);
}

export function fetchJobApplicants(jobListingId) {
    return axios.get(`/api/hr/job-listings/${jobListingId}/applicants`).then((r) => r.data);
}

export function fetchCandidateProfile(userId) {
    return axios.get(`/api/hr/candidates/${userId}`).then((r) => r.data);
}

// ── Applications (Candidate) ──────────────────────────────────────────────────

export function fetchMyApplications() {
    return axios.get('/api/candidate/applications').then((r) => r.data.applications);
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export function fetchHrAnalytics() {
    return axios.get('/api/hr/analytics').then((r) => r.data);
}

// ── Hires ─────────────────────────────────────────────────────────────────────

export function fetchHrHires() {
    return axios.get('/api/hr/hires').then((r) => r.data.hires);
}

// ── Team ──────────────────────────────────────────────────────────────────────

export function fetchHrTeam() {
    return axios.get('/api/hr/team').then((r) => r.data);
}

export function addHrTeamMember(formData) {
    return axios.post('/api/hr/team', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data);
}

export function removeHrTeamMember(id) {
    return axios.delete(`/api/hr/team/${id}`).then((r) => r.data);
}

// ── Settings ──────────────────────────────────────────────────────────────────

export function fetchHrSettings() {
    return axios.get('/api/hr/settings').then((r) => r.data);
}

export function saveHrSettings(data) {
    return axios.put('/api/hr/settings', data).then((r) => r.data);
}

export function saveHrAccount(data) {
    return axios.put('/api/hr/account', data).then((r) => r.data);
}

export function saveHrNotifications(notifications) {
    return axios.put('/api/hr/notifications', { notifications }).then((r) => r.data);
}
