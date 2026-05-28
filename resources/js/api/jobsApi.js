import axios from 'axios';
import {
  JOB_LISTING_TYPES,
  jobTypesLabel,
  normalizeJobTypes,
} from '../utils/jobFormUtils';

export { JOB_LISTING_TYPES };

function normalizeTags(tags) {
    if (Array.isArray(tags)) {
        return tags;
    }
    if (typeof tags === 'string' && tags.trim()) {
        try {
            const parsed = JSON.parse(tags);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }
    return [];
}

/** True if the job is tagged with this type (it may also have other types). */
export function jobMatchesTypeFilter(job, filter) {
    const types = normalizeJobTypes(job.types, job.type);

    if (filter === 'Remote') {
        return types.includes('Remote') || /remote/i.test(job.location || '');
    }

    return types.includes(filter);
}

/** Job must include every selected type; extra types on the job are allowed. */
export function jobMatchesAllTypeFilters(job, typeFilters) {
    if (!typeFilters.length) {
        return true;
    }

    return typeFilters.every((filter) => jobMatchesTypeFilter(job, filter));
}

export function listJobListings(params = {}) {
    return axios.get('/api/job-listings', { params }).then((response) => response.data);
}

export function filterJobListings(jobs, { typeFilters = [], searchQuery = '' } = {}) {
    let result = jobs;

    if (typeFilters.length > 0) {
        result = result.filter((job) => jobMatchesAllTypeFilters(job, typeFilters));
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
        result = result.filter((job) => {
            const haystack = [
                job.title,
                job.company,
                job.location,
                job.salary,
                job.description,
                job.type,
                ...(job.types || []),
                ...(job.tags || []),
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return haystack.includes(query);
        });
    }

    return result;
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

export function updateJobListing(id, payload) {
    return axios.put(`/api/job-listings/${id}`, payload).then((response) => response.data);
}

export function deleteJobListing(id) {
    return axios.delete(`/api/job-listings/${id}`).then((response) => response.data);
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

    const types = normalizeJobTypes(job.types, job.type);
    const type = jobTypesLabel(types);

    return {
        id: job.id,
        initials: initials || 'JB',
        title: job.title,
        company: job.company,
        location: job.location || '—',
        salary: job.salary || '—',
        time,
        types,
        type,
        featured: index < 2,
        tags: normalizeTags(job.tags),
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
