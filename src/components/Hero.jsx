import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="text-center lg:text-left z-10 bg-gradient-to-r from-gray-900 via-black to-gray-900 
                     backdrop-blur-sm rounded-2xl p-8 border border-gray-500 opacity-90 shadow-lg">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl"
          >
            <span className="gradient-text drop-shadow-lg">Deon Hill</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl lg:text-3xl text-gray-100 mb-8 font-light drop-shadow-lg"
          >
            Engineering for Efficiency & Optimizing Workflows!
          </motion.p>
        
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-gray-500 
                       hover:border-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold 
                       transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl
                       hover:bg-gray-600"
          >
            View My Work
          </motion.button>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 
                           rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <img
              src="assets/LNProfilePic.jpg"
              alt="Deon Hill - Software Engineer"
              className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full object-cover 
                        border-4 border-gray-500 shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="animate-bounce text-gray-400" size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;