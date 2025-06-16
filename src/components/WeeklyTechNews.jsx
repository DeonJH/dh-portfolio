import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ExternalLink, Settings, TestTube, AlertCircle } from 'lucide-react';

// Test content for fallback
const TEST_CONTENT = `🚀 This Week in Tech - December 16, 2024

🤖 AI & Machine Learning
• OpenAI releases GPT-4 Turbo with improved reasoning capabilities
• Google announces Gemini Ultra, claiming to surpass GPT-4 in benchmarks
• Microsoft integrates Copilot deeper into Office 365 suite

💻 Software Development
• React 19 enters beta with new concurrent features
• Node.js 21 released with improved performance optimizations
• TypeScript 5.3 introduces new syntax for better type inference

🔐 Cybersecurity
• Major vulnerability discovered in popular npm package affecting millions
• New zero-day exploit in Windows patched in emergency update
• Chrome implements enhanced sandboxing for better security

🌐 Web & Cloud
• AWS announces new serverless computing options
• Cloudflare introduces enhanced DDoS protection
• Progressive Web Apps gain new capabilities in latest browser updates

📱 Mobile & Hardware
• Apple confirms USB-C adoption across entire product line
• Samsung unveils new foldable display technology
• Qualcomm's latest chip promises 40% better battery efficiency

This content is loaded from test data for debugging purposes.`;

// Google Sheets configuration with safer environment variable access
const SHEET_CONFIG = {
    SHEET_ID: '1UB5XZJO4SRoHtv7lgCRVuiun5-_aTLggozxEw3bvI1Q',
    API_KEY: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_API_KEY) || 
             (typeof process !== 'undefined' && process.env?.REACT_APP_GOOGLE_API_KEY) || 
             null,
    RANGE: 'Sheet1!A:Z'
};



/**
 * Simple Google Sheets API call with enhanced error handling
 */
const fetchGoogleSheetContent = async () => {
    try {
        if (!SHEET_CONFIG.API_KEY) {
            throw new Error('Google API key not found. Please add REACT_APP_GOOGLE_API_KEY to your .env file.');
        }

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_CONFIG.SHEET_ID}/values/${SHEET_CONFIG.RANGE}?key=${SHEET_CONFIG.API_KEY}`;
        
        console.log('🔍 Fetching from Google Sheets API...');
        console.log('📄 Sheet ID:', SHEET_CONFIG.SHEET_ID);
        console.log('🔑 API Key (first 10 chars):', SHEET_CONFIG.API_KEY ? SHEET_CONFIG.API_KEY.substring(0, 10) + '...' : 'Not found');

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('❌ API Response failed:', response.status, response.statusText);
            
            let errorMessage;
            switch (response.status) {
                case 403:
                    errorMessage = 'API key invalid or Google Sheets API not enabled. Check your API key and enable the Google Sheets API in Google Cloud Console.';
                    break;
                case 404:
                    errorMessage = 'Sheet not found. Make sure the sheet ID is correct and the sheet is shared publicly.';
                    break;
                case 400:
                    errorMessage = 'Bad request. Check the sheet range or API parameters.';
                    break;
                default:
                    errorMessage = `API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`;
            }
            
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('✅ API Response received, rows:', data.values?.length || 0);

        if (!data.values || data.values.length === 0) {
            throw new Error('No data found in the sheet. Make sure your sheet has content.');
        }

        if (data.values.length < 2) {
            throw new Error('Sheet only has headers. Make sure there is data in the rows below the headers.');
        }

        // Find content column
        const headers = data.values[0];
        console.log('📋 Headers found:', headers);
        
        const contentIndex = headers.findIndex(header => 
            header && (
                header.toLowerCase().includes('content') ||
                header.toLowerCase().includes('summary') ||
                header.toLowerCase().includes('digest')
            )
        );

        if (contentIndex === -1) {
            throw new Error(`Content column not found. Available columns: ${headers.join(', ')}`);
        }

        // Get content from first data row
        const firstDataRow = data.values[1];
        if (!firstDataRow || !firstDataRow[contentIndex]) {
            throw new Error(`No content found in the first data row at column "${headers[contentIndex]}"`);
        }

        const contentText = firstDataRow[contentIndex].trim();
        
        if (contentText.length < 20) {
            throw new Error(`Content too short (${contentText.length} characters). Expected substantial content.`);
        }

        console.log('✅ Successfully fetched content, length:', contentText.length);
        return contentText;

    } catch (error) {
        console.error('🚨 Error fetching Google Sheets content:', error);
        throw error;
    }
};

/**
 * Setup Instructions Component
 */
const SetupInstructions = ({ onClose }) => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6"
    >
        <h3 className="text-lg font-semibold text-blue-400 mb-4">🔧 Google Sheets API Setup</h3>
        <div className="text-sm text-gray-300 space-y-3">
            <div>
                <strong className="text-white">Step 1: Get Google API Key</strong>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                    <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Cloud Console</a></li>
                    <li>Create a new project or select existing one</li>
                    <li>Enable the "Google Sheets API"</li>
                    <li>Go to "Credentials" → "Create Credentials" → "API Key"</li>
                    <li>Copy your API key</li>
                </ul>
            </div>
            <div>
                <strong className="text-white">Step 2: Configure API Key</strong>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                    <li>Create a <code className="bg-gray-800 px-1 rounded">.env</code> file in your project root</li>
                    <li>Add: <code className="bg-gray-800 px-1 rounded">REACT_APP_GOOGLE_API_KEY=your_api_key_here</code></li>
                    <li>Restart your development server</li>
                </ul>
            </div>
            <div>
                <strong className="text-white">Step 3: Make Sheet Accessible</strong>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                    <li>Open your Google Sheet</li>
                    <li>Click "Share" → "Change to anyone with the link"</li>
                    <li>Set permissions to "Viewer"</li>
                </ul>
            </div>
        </div>
        <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
        >
            Got it!
        </button>
    </motion.div>
);

/**
 * Main WeeklyTechNews Component - Production Ready
 */
const WeeklyTechNews = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSetup, setShowSetup] = useState(false);
    const [lastFetch, setLastFetch] = useState(null);

    const fetchContent = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const fetchedContent = await fetchGoogleSheetContent();
            setContent(fetchedContent);
            setLastFetch(new Date());
            
        } catch (err) {
            console.error('❌ Error fetching content:', err);
            setError(err.message || 'Unknown error occurred');
            
            // Show setup instructions if API key is not configured
            if (err.message && err.message.includes('API key not found')) {
                setShowSetup(true);
            }
        } finally {
            setLoading(false);
        }
    };

    // Fetch content on component mount
    useEffect(() => {
        fetchContent();
    }, []);

    // Wrap the entire render in a try-catch for safety
    try {
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
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            <span className="gradient-text">Weekly Tech News</span>
                        </h2>
                    </motion.div>

                    {/* Simple Error Display */}
                    {error && (
                        <div className="text-center py-8 mb-8">
                            <p className="text-red-400 text-sm">Unable to load content at this time.</p>
                        </div>
                    )}

                    {/* Content Display */}
                    {content && !loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-gray-500 rounded-xl p-8"
                        >
                            <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                {content}
                            </div>
                        </motion.div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-16">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-2 border-green-400 border-t-transparent mx-auto"></div>
                                <p className="text-gray-300 mt-4">Loading...</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    } catch (renderError) {
        console.error('WeeklyTechNews render error:', renderError);
        return (
            <section id="tech-news" className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        <span className="gradient-text">Weekly Tech News</span>
                    </h2>
                    <p className="text-gray-400 text-sm">Content temporarily unavailable.</p>
                </div>
            </section>
        );
    }
};

export default WeeklyTechNews; 