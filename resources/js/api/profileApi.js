import axios from 'axios';

export function getCandidateProfile() {
  return axios.get('/api/candidate/profile').then((r) => r.data);
}

export function saveCandidateProfile(payload) {
  return axios.put('/api/candidate/profile', payload).then((r) => r.data);
}

export function clearCandidateProfile() {
  return axios.delete('/api/candidate/profile').then((r) => r.data);
}
