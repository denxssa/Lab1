import React from 'react';
import Navbar from '../../components/shared/navbar/Navbar';
import Footer from '../../components/shared/footer/Footer';
import './Pricing.scss';

const plans = [
  {
    name: 'Basic',
    price: '$19.99',
    period: '/month',
    summary: 'For small teams hiring occasionally.',
    highlights: ['1 active role', 'Up to 5 evaluators', 'Email support'],
  },
  {
    name: 'Standard',
    price: '$49.99',
    period: '/month',
    summary: 'For scaling teams with steady recruitment.',
    highlights: ['10 active roles', 'Unlimited evaluators', 'Talent pool and scorecards'],
    featured: true,
  },
  {
    name: 'Premium',
    price: '$99',
    period: '/month',
    summary: 'For organizations with strict workflows and compliance needs.',
    highlights: ['Unlimited roles', 'Approval workflows', 'SSO and audit export'],
  },
];

const Pricing = () => {
  return (
    <div className="pricing-page">
      <Navbar />

      <section className="pricing-hero">
        <div className="pricing-hero__inner pricing-container">
          <h1>
            Scale your team,
            <span> not your costs.</span>
          </h1>
          <p>
            Launch lean, scale as you grow, and keep every hiring decision visible
            from first application to final offer.
          </p>
        </div>
      </section>

      <section className="pricing-plans">
        <div className="pricing-container pricing-plans__grid">
          {plans.map((plan) => (
            <article
              className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`.trim()}
              key={plan.name}
            >
              {plan.featured && <span className="pricing-card__badge">Most Popular</span>}
              <h3>{plan.name}</h3>
              <p className="pricing-card__price">
                {plan.price}
                <small>{plan.period}</small>
              </p>
              <p className="pricing-card__summary">{plan.summary}</p>
              <ul>
                {plan.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="/" className="pricing-card__cta">
                Choose {plan.name}
              </a>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
