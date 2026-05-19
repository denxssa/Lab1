import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCalendarAlt, FaExternalLinkAlt, FaMapMarkerAlt, FaVideo } from 'react-icons/fa';
import InterviewMeeting from '../../../../../../components/InterviewMeeting/InterviewMeeting';
import { listInterviews } from '../../../../../../api/interviewsApi';
import {
  formatInterviewDate,
  formatStatusLabel,
  typeLabel,
} from '../../../../../../utils/interviewUtils';
import './Interviews.scss';

const Interviews = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadInterviews = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listInterviews();
      setInterviews(data.interviews || []);
    } catch (err) {
      setInterviews([]);
      if (err?.response?.status === 401) {
        setError('Please log in to view your interviews.');
      } else {
        setError('Unable to load interviews.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      loadInterviews();
    }
  }, [token, loadInterviews]);

  if (token) {
    return (
      <main className="interviews">
        <InterviewMeeting
          token={token}
          onLeave={() => navigate('/interviews')}
        />
      </main>
    );
  }

  return (
    <main className="interviews">
      <section className="interviews__header">
        <div>
          <h1>Interviews</h1>
          <p>Your scheduled interviews with secure join links.</p>
        </div>
      </section>

      {loading && <p className="interviews__empty">Loading interviews…</p>}
      {error && <p className="interviews__empty interviews__empty--error">{error}</p>}

      {!loading && !error && interviews.length === 0 && (
        <p className="interviews__empty">No interviews scheduled yet.</p>
      )}

      <section className="interviews__list" aria-label="Scheduled interviews">
        {interviews.map((interview) => (
          <article className="interviews__card" key={interview.id}>
            <div className="interviews__card-icon">
              <FaCalendarAlt aria-hidden="true" />
            </div>
            <div className="interviews__card-content">
              <h3>{interview.title}</h3>
              <p>{interview.company || interview.hr_user?.name}</p>
              <span>{formatInterviewDate(interview.scheduled_at)}</span>
              <span className={`interviews__status interviews__status--${interview.status}`}>
                {formatStatusLabel(interview.status)}
              </span>
              <span className="interviews__type">
                {interview.type === 'video' ? <FaVideo aria-hidden="true" /> : <FaMapMarkerAlt aria-hidden="true" />}
                {typeLabel(interview.type)}
                {interview.type === 'in_person' && interview.location ? ` · ${interview.location}` : ''}
              </span>
            </div>
            {interview.type === 'video' && interview.status !== 'cancelled' && (
              <button
                type="button"
                onClick={() => navigate(`/interviews/join/${interview.access_token}`)}
              >
                <FaExternalLinkAlt aria-hidden="true" />
                Join
              </button>
            )}
          </article>
        ))}
      </section>
    </main>
  );
};

export default Interviews;
