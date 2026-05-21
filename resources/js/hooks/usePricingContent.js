import { useEffect, useState } from 'react';

const cache = { hero: null, plans: null };

const usePricingContent = () => {
    const [hero, setHero]   = useState(cache.hero);
    const [plans, setPlans] = useState(cache.plans);

    useEffect(() => {
        if (!cache.hero) {
            fetch('/api/home-page-content')
                .then(r => r.json())
                .then(payload => {
                    cache.hero = payload?.pageContent?.pricing || {};
                    setHero(cache.hero);
                })
                .catch(() => {});
        }
        if (!cache.plans) {
            fetch('/api/pricing-plans')
                .then(r => r.json())
                .then(data => {
                    cache.plans = data;
                    setPlans(data);
                })
                .catch(() => {});
        }
    }, []);

    return { hero: hero || {}, plans: plans || null };
};

export default usePricingContent;
