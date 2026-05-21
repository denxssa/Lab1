import axios from 'axios';

export function listJobListings() {
    return axios.get('/api/job-listings').then((response) => response.data);
}

export function getJobListing(id) {
    return axios.get(`/api/job-listings/${id}`).then((response) => response.data);
}

export function listJobListingsForHr() {
    return axios.get('/api/job-listings/manage').then((response) => response.data);
}

export function createJobListing(payload) {
    return axios.post('/api/job-listings', payload).then((response) => response.data);
}

export function updateJobListingStatus(id, status) {
    return axios.put(`/api/job-listings/${id}`, { status }).then((response) => response.data);
}

export function mapJobListing(job, index = 0) {
    const company = job.company || '';
    const initials = company
        .split(' ')
        .filter(Boolean)
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const posted = job.created_at ? new Date(job.created_at) : null;
    let time = 'Recently';
    if (posted) {
        const days = Math.floor((Date.now() - posted.getTime()) / (1000 * 60 * 60 * 24));
        if (days === 0) time = 'Today';
        else if (days === 1) time = '1 day ago';
        else time = `${days} days ago`;
    }

    return {
        id: job.id,
        initials: initials || 'JB',
        title: job.title,
        company: job.company,
        location: job.location || '—',
        salary: job.salary || '—',
        time,
        type: job.type || 'Full-time',
        featured: index < 2,
        tags: Array.isArray(job.tags) ? job.tags : [],
        description: job.description || '',
    };
}

export function mapJobListingForHr(job) {
    const base = mapJobListing(job);
    const posted = job.created_at ? new Date(job.created_at) : new Date();
    const postedDays = Math.floor((Date.now() - posted.getTime()) / (1000 * 60 * 60 * 24));
    const status = job.status || (job.is_active ? 'active' : 'closed');

    return {
        ...base,
        status,
        applications: 0,
        reviewing: 0,
        shortlisted: 0,
        daysLeft: status === 'active' ? 30 : 0,
        postedDays,
        featured: false,
    };
}
