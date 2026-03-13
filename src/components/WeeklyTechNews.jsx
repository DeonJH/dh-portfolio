import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Legacy: Google Sheets v1 configuration
const SHEET_CONFIG = {
    SHEET_ID: '1UB5XZJO4SRoHtv7lgCRVuiun5-_aTLggozxEw3bvI1Q',
    API_KEY: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_API_KEY) ||
             (typeof process !== 'undefined' && process.env?.REACT_APP_GOOGLE_API_KEY) ||
             null,
    RANGE: 'Sheet1!A:Z'
};

/**
 * Legacy: Google Sheets v1 data source (n8n + RSS pipeline, no longer active)
 */
const fetchGoogleSheetContent = async () => {
    if (!SHEET_CONFIG.API_KEY) throw new Error('Google API key not configured.');
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_CONFIG.SHEET_ID}/values/${SHEET_CONFIG.RANGE}?key=${SHEET_CONFIG.API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Sheets API error: ${response.status}`);
    const data = await response.json();
    if (!data.values || data.values.length < 2) throw new Error('No data in sheet.');
    const headers = data.values[0];
    const contentIndex = headers.findIndex(h =>
        h && (h.toLowerCase().includes('content') || h.toLowerCase().includes('summary') || h.toLowerCase().includes('digest'))
    );
    if (contentIndex === -1) throw new Error('Content column not found.');
    return data.values[1][contentIndex]?.trim() || '';
};

// Parse the AI-generated digest text into structured sections
function parseDigest(text) {
    const paragraphs = text.split('\n\n').map(p => p.trim()).filter(Boolean);
    let title = '', intro = '', closing = '';
    const categories = [];

    for (const para of paragraphs) {
        if (/^\*\*Weekly Tech News/.test(para)) {
            title = para.replace(/\*\*/g, '').trim();
        } else if (/^\d+\.\s+\*\*/.test(para)) {
            const match = para.match(/^\d+\.\s+\*\*(.+?)\*\*[:\s]+(.+)$/s);
            if (match) categories.push({ name: match[1].trim(), body: match[2].trim() });
        } else if (!intro && categories.length === 0) {
            intro = para;
        } else {
            closing = para;
        }
    }
    return { title, intro, categories, closing };
}

// Framer Motion variants for staggered card entrance (from motion.dev docs)
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

const WeeklyTechNews = () => {
    const [digest, setDigest] = useState('');
    const [generated, setGenerated] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        setLoading(true);
        setError(null);
        fetch(`${import.meta.env.BASE_URL}tech-news.json?v=${Date.now()}`)
            .then(r => {
                if (!r.ok) throw new Error(`Failed to load news (${r.status})`);
                return r.json();
            })
            .then(data => {
                if (!ignore) {
                    setDigest(data.digest || '');
                    setGenerated(data.generated || null);
                }
            })
            .catch(err => { if (!ignore) setError(err.message); })
            .finally(() => { if (!ignore) setLoading(false); });
        return () => { ignore = true; };
    }, []);

    const parsed = digest ? parseDigest(digest) : null;

    return (
        <section id="tech-news" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        <span className="gradient-text">Weekly Tech News</span>
                    </h2>
                    {generated && (
                        <p className="text-gray-400 text-sm">
                            Updated: {new Date(generated).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    )}
                </motion.div>

                {loading && (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-2 border-green-400 border-t-transparent mx-auto" />
                            <p className="text-gray-300 mt-4">Loading...</p>
                        </div>
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-8">
                        <p className="text-red-400 text-sm">Unable to load content at this time.</p>
                    </div>
                )}

                {!loading && !error && parsed && (
                    <div className="space-y-8">
                        {/* Intro */}
                        {parsed.intro && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-gray-300 text-lg leading-relaxed text-center max-w-2xl mx-auto"
                            >
                                {parsed.intro}
                            </motion.p>
                        )}

                        {/* Category cards — 2-column grid, staggered entrance */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-3"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            {parsed.categories.slice(0, 6).map((cat, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="flex gap-4 p-5 bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-gray-500 rounded-xl
                                               hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/5
                                               transition-all duration-300 group"
                                >
                                    {/* Number badge */}
                                    <div className="shrink-0 w-7 h-7 rounded-full bg-green-500/20 border border-green-500/40
                                                    flex items-center justify-center mt-0.5">
                                        <span className="text-green-400 text-xs font-bold">{i + 1}</span>
                                    </div>
                                    {/* Content */}
                                    <div className="min-w-0">
                                        <span className="text-green-400 font-semibold text-sm uppercase tracking-wide
                                                         group-hover:text-green-300 transition-colors">
                                            {cat.name}
                                        </span>
                                        <p className="text-gray-300 text-sm leading-relaxed mt-1">{cat.body}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Closing */}
                        {parsed.closing && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-gray-500 text-sm italic text-center pt-2"
                            >
                                {parsed.closing}
                            </motion.p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default WeeklyTechNews;
