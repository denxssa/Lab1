import { useEffect, useState } from 'react';

// Simple cache so we only fetch once per page load
const cache = { data: null };

const useAboutContent = () => {
    const [content, setContent] = useState(cache.data);

    useEffect(() => {
        if (cache.data) return;
        fetch('/api/home-page-content')
            .then(r => r.json())
            .then(payload => {
                cache.data = payload?.pageContent?.about || {};
                setContent(cache.data);
            })
            .catch(() => {});
    }, []);

    return content || {};
};

export default useAboutContent;
