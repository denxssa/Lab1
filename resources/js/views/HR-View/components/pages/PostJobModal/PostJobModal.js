import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { createJobListing, updateJobListing } from '../../../../../api/jobsApi';
import {
  JOB_LISTING_TYPES,
  hasJobFormErrors,
  jobTypesLabel,
  mapApiErrorsToJobForm,
  normalizeJobTypes,
  validateJobForm,
} from '../../../../../utils/jobFormUtils';
import './PostJobModal.scss';

const emptyForm = {
  title: '',
  company: '',
  location: '',
  types: ['Full-time'],
  salary: '',
  tags: '',
  description: '',
};

function tagsToString(tags) {
  if (Array.isArray(tags)) {
    return tags.join(', ');
  }
  return '';
}

const PostJobModal = ({ job, onClose, onPosted }) => {
  const { user } = useAuth();
  const isEdit = Boolean(job?.id);
  const defaultCompany = localStorage.getItem('user_company') || user?.name || 'Your Company';
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isEdit) {
      setForm({
        title: job.title || '',
        company: job.company || defaultCompany,
        location: job.location || '',
        types: normalizeJobTypes(job.types, job.type),
        salary: job.salary === '—' ? '' : (job.salary || ''),
        tags: tagsToString(job.tags),
        description: job.description || '',
      });
      setFieldErrors({});
      return;
    }

    setForm({ ...emptyForm, company: defaultCompany });
    setFieldErrors({});
  }, [job, isEdit, defaultCompany]);

  const company = form.company || defaultCompany;
  const initials = company.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const typesLabel = jobTypesLabel(form.types);

  const handleChange = (e) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    setFieldErrors(validateJobForm(next));
    setError('');
  };

  const toggleType = (type) => {
    const hasType = form.types.includes(type);
    const types = hasType
      ? form.types.filter((t) => t !== type)
      : [...form.types, type];
    const next = { ...form, types };
    setForm(next);
    setFieldErrors(validateJobForm(next));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateJobForm(form);
    if (hasJobFormErrors(validationErrors)) {
      setFieldErrors(validationErrors);
      setError('Please fix the highlighted fields before saving.');
      return;
    }

    setSubmitting(true);
    setError('');
    setFieldErrors({});

    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean);
    const types = normalizeJobTypes(form.types);
    const payload = {
      title: form.title.trim(),
      company: form.company.trim() || defaultCompany,
      location: form.location.trim(),
      types,
      salary: form.salary.trim(),
      tags,
      description: form.description.trim() || undefined,
    };

    try {
      if (isEdit) {
        await updateJobListing(job.id, payload);
      } else {
        await createJobListing(payload);
      }
      onPosted?.();
      onClose();
      if (!isEdit) {
        setForm({ ...emptyForm, company: defaultCompany });
      }
    } catch (err) {
      const apiErrors = mapApiErrorsToJobForm(err?.response?.data?.errors);
      if (hasJobFormErrors(apiErrors)) {
        setFieldErrors(apiErrors);
        setError('Please fix the highlighted fields before saving.');
      } else {
        const message = err?.response?.data?.message
          || `Could not ${isEdit ? 'update' : 'post'} job. Make sure you are logged in as HR.`;
        setError(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const tagList = form.tags.split(',').map((t) => t.trim()).filter(Boolean);

  return (
    <div className="pjm-overlay" onClick={onClose}>
      <div className="pjm-modal" onClick={(e) => e.stopPropagation()}>

        <div className="pjm-form-panel">
          <div className="pjm-header">
            <h2>{isEdit ? 'Edit Job' : 'Post a New Job'}</h2>
            <button className="pjm-close" type="button" onClick={onClose}>✕</button>
          </div>
          <form className="pjm-form" onSubmit={handleSubmit} noValidate>
            <div className="pjm-field">
              <label>Job Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Developer"
                aria-invalid={Boolean(fieldErrors.title)}
              />
              {fieldErrors.title && <p className="pjm-field-error">{fieldErrors.title}</p>}
            </div>
            <div className="pjm-field">
              <label>Company</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name"
                aria-invalid={Boolean(fieldErrors.company)}
              />
              {fieldErrors.company && <p className="pjm-field-error">{fieldErrors.company}</p>}
            </div>
            <div className="pjm-field">
              <label>Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Remote, New York, NY"
                aria-invalid={Boolean(fieldErrors.location)}
              />
              {fieldErrors.location && <p className="pjm-field-error">{fieldErrors.location}</p>}
            </div>
            <div className="pjm-field">
              <label>Job types <span className="pjm-hint">(select all that apply)</span></label>
              <div className="pjm-type-options">
                {JOB_LISTING_TYPES.map((type) => (
                  <label key={type} className={`pjm-type-option${form.types.includes(type) ? ' is-selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={form.types.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
              {fieldErrors.types && <p className="pjm-field-error">{fieldErrors.types}</p>}
            </div>
            <div className="pjm-field">
              <label>Salary Range</label>
              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g. $80k – $100k"
                aria-invalid={Boolean(fieldErrors.salary)}
              />
              {fieldErrors.salary && <p className="pjm-field-error">{fieldErrors.salary}</p>}
            </div>
            <div className="pjm-field">
              <label>Skills / Tags <span className="pjm-hint">(comma separated)</span></label>
              <input name="tags" value={form.tags} onChange={handleChange} placeholder="e.g. React, TypeScript, Node.js" />
            </div>
            <div className="pjm-field">
              <label>Description <span className="pjm-hint">(optional)</span></label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the role, requirements, and benefits…"
              />
            </div>
            {error && <p className="pjm-error">{error}</p>}
            <button type="submit" className="pjm-submit" disabled={submitting}>
              {submitting ? (isEdit ? 'Saving…' : 'Posting…') : (isEdit ? 'Save changes' : 'Post Job')}
            </button>
          </form>
        </div>

        <div className="pjm-preview-panel">
          <p className="pjm-preview-label">Live Preview</p>
          <div className="pjm-preview-card">
            <div className="pjm-preview-head">
              <div className="pjm-preview-initials">{initials || 'CO'}</div>
              <div className="pjm-preview-title-block">
                <h3>{form.title || 'Job Title'}</h3>
                <p>{company}</p>
              </div>
              <div className="pjm-preview-types">
                {(form.types.length > 0 ? form.types : ['Full-time']).map((type) => (
                  <span key={type} className="pjm-preview-type">{type}</span>
                ))}
              </div>
            </div>
            <div className="pjm-preview-meta">
              <span> {form.location || 'Location'}</span>
              <span> {form.salary || 'Salary'}</span>
              <span> Just now</span>
            </div>
            {tagList.length > 0 && (
              <div className="pjm-preview-tags">
                {tagList.map((tag) => <div key={tag} className="pjm-preview-tag">{tag}</div>)}
              </div>
            )}
            <div className="pjm-preview-section">
              <h4>About the Role</h4>
              <p>
                {form.description || (
                  <>
                    We&apos;re looking for a talented {form.title || '...'} to join {company}.
                    This is a {typesLabel} position based in {form.location || '...'}.
                  </>
                )}
              </p>
            </div>
            <div className="pjm-preview-actions">
              <div className="pjm-preview-apply">↗ Apply Now</div>
              <div className="pjm-preview-save">Save Job</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostJobModal;
