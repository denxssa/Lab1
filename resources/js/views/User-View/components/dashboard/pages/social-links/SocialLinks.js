import React from 'react';
import { FiLinkedin, FiGithub, FiGlobe } from 'react-icons/fi';
import './SocialLinks.scss';

export default function SocialLinks({ form, onChange }) {
    const field = (key) => ({
        value: form[key] ?? '',
        onChange: (e) => onChange(key, e.target.value),
    });

    return (
        <div className="social-links">
            <div className="social-links__header">
                <div className="social-links__icon">
                    <FiGlobe size={18} />
                </div>
                <div>
                    <h3 className="social-links__title">Social links</h3>
                    <p className="social-links__subtitle">Where can people find you online</p>
                </div>
            </div>
            <div className="social-links__body">
                <div className="social-links__field">
                    <label><FiLinkedin size={13} /> LinkedIn</label>
                    <input type="text" placeholder="linkedin.com/in/yourname" {...field('linkedin')} />
                </div>
                <div className="social-links__field">
                    <label><FiGithub size={13} /> GitHub</label>
                    <input type="text" placeholder="github.com/yourname" {...field('github')} />
                </div>
                <div className="social-links__field">
                    <label><FiGlobe size={13} /> Portfolio</label>
                    <input type="text" placeholder="yoursite.com" {...field('portfolio')} />
                </div>
            </div>
        </div>
    );
}