import React from 'react';
import { FiStar } from 'react-icons/fi';
import './AboutMe.scss';

const MAX = 500;

export default function AboutMe({ value, onChange }) {
    return (
        <div className="about-me">
            <div className="about-me__header">
                <div className="about-me__icon">
                    <FiStar size={18} />
                </div>
                <div>
                    <h3 className="about-me__title">About me</h3>
                    <p className="about-me__subtitle">A short intro for recruiters</p>
                </div>
            </div>
            <div className="about-me__body">
                <textarea
                    className="about-me__textarea"
                    rows={5}
                    maxLength={MAX}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Write a short bio..."
                />
                <span className="about-me__count">{value.length}/{MAX}</span>
            </div>
        </div>
    );
}