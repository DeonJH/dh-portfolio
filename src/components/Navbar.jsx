import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

function Navbar() {
    const [activeSection, setActiveSection] = useState('hero');
    const [scrolled, setScrolled] = useState(false);
    const isClickScrolling = useRef(false);

    const navItems = [
        { id: 'hero', label: 'Intro' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'socials', label: 'Connect' }
    ];

    // IntersectionObserver for active section detection
    useEffect(() => {
        const sectionIds = ['hero', 'about', 'projects', 'tech-news', 'socials'];
        const sections = sectionIds
            .map(id => document.getElementById(id))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                if (isClickScrolling.current) return;

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        setActiveSection(id === 'tech-news' ? 'projects' : id);
                    }
                });
            },
            { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    // Lightweight scroll listener for navbar background + bottom-of-page edge case
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            if (isClickScrolling.current) return;

            const documentHeight = document.documentElement.scrollHeight;
            if (window.scrollY + window.innerHeight >= documentHeight - 50) {
                setActiveSection('socials');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            isClickScrolling.current = true;
            setActiveSection(sectionId);
            element.scrollIntoView({ behavior: 'smooth' });

            const fallback = setTimeout(() => {
                isClickScrolling.current = false;
            }, 1000);

            window.addEventListener('scrollend', () => {
                clearTimeout(fallback);
                isClickScrolling.current = false;
            }, { once: true });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-md border-b border-gray-500'
                    : 'bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-sm'
            }`}
        >
            <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4">
                <div className="flex justify-center items-center">
                    <ul className="flex space-x-0.5 sm:space-x-1 bg-gray-800/50 rounded-full p-1 sm:p-2 backdrop-blur-sm border border-gray-600/30">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative px-3 sm:px-6 py-2.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                                        activeSection === item.id
                                            ? 'text-white'
                                            : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.nav>
    );
}

export default Navbar;