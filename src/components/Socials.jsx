import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Calendar, Users, Zap, CheckCircle } from 'lucide-react';

const Socials = () => {
    const [calendlyLoading, setCalendlyLoading] = useState(false);
    const [showCalendly, setShowCalendly] = useState(false);

    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://linkedin.com/in/deon-hill',
            color: 'from-blue-600 to-blue-700',
            hoverColor: 'hover:from-blue-500 hover:to-blue-600',
            description: 'Connect with me professionally'
        },
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/DeonJH',
            color: 'from-gray-700 to-gray-800',
            hoverColor: 'hover:from-gray-600 hover:to-gray-700',
            description: 'Check out my code repositories'
        },
        {
            name: 'Email',
            icon: Mail,
            url: 'mailto:Deonjh12@gmail.com',
            color: 'from-green-600 to-emerald-700',
            hoverColor: 'hover:from-green-500 hover:to-emerald-600',
            description: 'Get in touch directly'
        }
    ];

    // Load Calendly widget script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = () => {
            console.log('Calendly script loaded successfully');
        };
        script.onerror = () => {
            console.error('Failed to load Calendly script');
        };
        document.body.appendChild(script);

        return () => {
            // Only remove if it exists
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    // Initialize Calendly widget when it becomes visible
    useEffect(() => {
        if (showCalendly) {
            setCalendlyLoading(true);
            
            // Wait for Calendly script to load if it hasn't already
            const initializeWidget = () => {
                if (window.Calendly) {
                    const widgetElement = document.querySelector('#calendly-inline-widget-socials');
                    if (widgetElement) {
                        // Clear any existing content
                        widgetElement.innerHTML = '';
                        
                        // Initialize the widget
                        window.Calendly.initInlineWidget({
                            url: 'https://calendly.com/hill-d',
                            parentElement: widgetElement,
                            prefill: {},
                            utm: {}
                        });
                        
                        setCalendlyLoading(false);
                    }
                } else {
                    // If Calendly hasn't loaded yet, try again after a short delay
                    setTimeout(initializeWidget, 100);
                }
            };
            
            // Small delay to ensure DOM is ready
            setTimeout(initializeWidget, 50);
        } else {
            setCalendlyLoading(false);
        }
    }, [showCalendly]);

    return (
        <section id="socials" className="py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        <span className="gradient-text">Let&apos;s Connect</span>
                    </h2>
                </motion.div>

                <div className="flex justify-center items-center gap-8 flex-wrap mb-12">
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="group"
                        >
                            <div className="flex items-center gap-3 px-6 py-3 bg-gray-800/50 border border-gray-600 
                                          rounded-full hover:border-gray-500 transition-all duration-300 
                                          backdrop-blur-sm hover:bg-gray-700/50">
                                <social.icon size={20} className={`${
                                    social.name === 'LinkedIn' ? 'text-blue-400' :
                                    social.name === 'GitHub' ? 'text-gray-300' :
                                    'text-green-400'
                                }`} />
                                <span className="text-gray-200 font-medium">{social.name}</span>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Schedule Meeting Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowCalendly(!showCalendly)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 
                                   text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 
                                   transform shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
                    >
                        <Calendar size={24} />
                        {showCalendly ? 'Hide Calendar' : 'Schedule a Meeting'}
                    </motion.button>
                </motion.div>

                {/* Calendly Widget */}
                {showCalendly && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-gray-500 
                                   rounded-xl p-4 sm:p-6 shadow-lg backdrop-blur-sm"
                    >
                        {/* Meeting benefits */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                                <Users className="mx-auto mb-2 text-blue-400" size={20} />
                                <h4 className="font-semibold text-white text-sm">Discuss Your Project Needs</h4>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                                <Zap className="mx-auto mb-2 text-green-400" size={20} />
                                <h4 className="font-semibold text-white text-sm">Experience Automation in Action</h4>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                                <CheckCircle className="mx-auto mb-2 text-purple-400" size={20} />
                                <h4 className="font-semibold text-white text-sm">Get Technical Insights</h4>
                            </div>
                        </div>
                        
                        {/* Calendly Widget */}
                        <div className="relative">
                            {calendlyLoading && (
                                <div className="absolute inset-0 bg-gray-800 rounded-lg border border-gray-600 flex items-center justify-center z-10">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-400 border-t-transparent mx-auto mb-3"></div>
                                        <p className="text-gray-300">Loading calendar...</p>
                                    </div>
                                </div>
                            )}
                            
                            <div 
                                id="calendly-inline-widget-socials"
                                className="calendly-inline-widget rounded-lg overflow-hidden border border-gray-600 w-full h-96 md:h-[600px]" 
                                data-url="https://calendly.com/hill-d"
                                style={{ backgroundColor: '#1f2937' }}
                            >
                                {/* Fallback content if widget fails to load */}
                                <div className="flex items-center justify-center h-full bg-gray-800">
                                    <div className="text-center p-8">
                                        <Calendar className="mx-auto mb-4 text-green-400" size={48} />
                                        <h4 className="text-lg font-semibold text-white mb-2">Loading Calendly...</h4>
                                        <p className="text-gray-400 mb-4">If the calendar doesn't load, you can visit directly:</p>
                                        <a 
                                            href="https://calendly.com/hill-d" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
                                        >
                                            <ExternalLink size={16} />
                                            Open Calendly
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default Socials;