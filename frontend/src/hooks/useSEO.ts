import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOData {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    canonical_url: string;
    og_title: string;
    og_description: string;
    og_image: string;
    twitter_title: string;
    twitter_description: string;
    robots: string;
    schema_type: string;
}

const DEFAULT_SEO: SEOData = {
    meta_title: "TrusComp - Labor Law Compliance Solutions",
    meta_description: "Technology-driven labor law compliance solutions. PF, ESIC, Payroll, Audits & Consulting services for businesses across India.",
    meta_keywords: "labor law compliance, PF compliance, ESIC compliance, payroll services, HR compliance, statutory compliance India",
    canonical_url: "https://truscomp.com",
    og_title: "TrusComp - Compliance Engineered for Confidence",
    og_description: "Technology-driven labor law compliance solutions for businesses across India.",
    og_image: "https://truscomp.com/og-image.jpg",
    twitter_title: "TrusComp - Labor Law Compliance Solutions",
    twitter_description: "Technology-driven labor law compliance solutions for businesses across India.",
    robots: "index, follow",
    schema_type: "Organization"
};

export const useSEO = (pageType: string, referenceId?: string) => {
    const [seo, setSeo] = useState<SEOData | null>(null);
    const location = useLocation();

    useEffect(() => {
        const fetchSEO = async () => {
            try {
                // Use relative URL to leverage Vite proxy
                const url = new URL('/api/v1/seo/public', window.location.origin);
                url.searchParams.append('page_type', pageType);
                if (referenceId) {
                    url.searchParams.append('page_reference_id', referenceId);
                }

                const response = await fetch(url.toString(), { cache: 'no-cache' });
                const data = await response.json();

                if (data && Object.keys(data).length > 0) {
                    setSeo(data);
                    updateHead(data);
                } else {
                    setSeo(DEFAULT_SEO);
                    updateHead(DEFAULT_SEO);
                }
            } catch (err) {
                console.error('Failed to fetch SEO:', err);
                setSeo(DEFAULT_SEO);
                updateHead(DEFAULT_SEO);
            }
        };

        fetchSEO();

        // Cleanup function can be added if needed, but updateHead is idempotent
    }, [pageType, referenceId, location.pathname]);

    const updateHead = (data: SEOData) => {
        // Use provided data or fallback to defaults for individual fields
        const title = data.meta_title || DEFAULT_SEO.meta_title;
        document.title = title;

        updateMetaTag('description', data.meta_description || DEFAULT_SEO.meta_description);
        updateMetaTag('keywords', data.meta_keywords || DEFAULT_SEO.meta_keywords);
        updateMetaTag('robots', data.robots || DEFAULT_SEO.robots);

        // Canonical
        const canonicalUrl = data.canonical_url || `${DEFAULT_SEO.canonical_url}${location.pathname}`;
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', canonicalUrl);

        // Open Graph
        updateMetaTag('og:title', data.og_title || title, 'property');
        updateMetaTag('og:description', data.og_description || data.meta_description || DEFAULT_SEO.og_description, 'property');
        updateMetaTag('og:image', data.og_image || DEFAULT_SEO.og_image, 'property');
        updateMetaTag('og:url', window.location.href, 'property');
        updateMetaTag('og:type', 'website', 'property');

        // Twitter
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', data.twitter_title || data.og_title || title);
        updateMetaTag('twitter:description', data.twitter_description || data.og_description || data.meta_description || DEFAULT_SEO.twitter_description);
        updateMetaTag('twitter:image', data.og_image || DEFAULT_SEO.og_image);
    };

    const updateMetaTag = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
        if (!content && content !== "") return;
        let tag = document.querySelector(`meta[${attr}="${name}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute(attr, name);
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
    };

    return seo;
};
