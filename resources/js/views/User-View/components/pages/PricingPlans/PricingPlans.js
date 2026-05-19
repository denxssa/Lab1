import React from 'react';
import './PricingPlans.scss';

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

const PricingPlans = () => {
  return (
    <section className="pricing-plans">
      <div className="pricing-container pricing-plans__grid">
        {plans.map((plan, i) => (
          <article
            className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`.trim()}
            key={plan.name}
            data-aos="fade-up"
            data-aos-delay={i * 100}
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
  );
};

export default PricingPlans;