import React from 'react';
import './PricingHero.scss';
import usePricingContent from '../../../../../hooks/usePricingContent';

const PricingHero = () => {
  const { hero } = usePricingContent();

  const eyebrow = hero.heroEyebrow    || null;
  const title   = hero.heroTitle       || 'Scale your team, not your costs.';
  const desc    = hero.heroDescription || 'Launch lean, scale as you grow, and keep every hiring decision visible from first application to final offer.';
  const cta     = hero.primaryCta      || null;

  return (
    <section className="pricing-hero">
      <div className="pricing-hero__inner pricing-container">
        {eyebrow && <span className="pricing-hero__eyebrow" data-aos="fade-up">{eyebrow}</span>}
        <h1 data-aos="fade-up">{title}</h1>
        <p data-aos="fade-up">{desc}</p>
        {cta && <a className="pricing-hero__cta" href="#pricing-plans" data-aos="fade-up">{cta} <span>→</span></a>}
      </div>
    </section>
  );
};

export default PricingHero;
