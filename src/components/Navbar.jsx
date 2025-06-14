import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function Navbar() {
    const [activeSection, setActiveSection] = useState('hero');
    const [scrolled, setScrolled] = useState(false);

    const navItems = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'socials', label: 'Connect' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            
            // Update active section based on scroll position
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight / 2; // Use middle of viewport
            
            // Find the section that's currently most visible
            let currentSection = 'hero'; // default
            let minDistance = Infinity;
            
            sections.forEach((section, index) => {
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionCenter = sectionTop + section.offsetHeight / 2;
                    const distance = Math.abs(scrollPosition - sectionCenter);
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        currentSection = navItems[index].id;
                    }
                }
            });
            
            // Special handling for the last section (Connect/Socials)
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                const documentHeight = document.documentElement.scrollHeight;
                const windowHeight = window.innerHeight;
                const scrollTop = window.scrollY;
                
                // If we're near the bottom of the page, activate the last section
                if (scrollTop + windowHeight >= documentHeight - 100) {
                    currentSection = navItems[sections.length - 1].id;
                }
            }
            
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once on mount to set initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-500/30' 
                    : 'bg-black/80 backdrop-blur-sm'
            }`}
        >
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex justify-center items-center">
                    <ul className="flex space-x-1 bg-gray-800/50 rounded-full p-2 backdrop-blur-sm border border-gray-600/30">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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