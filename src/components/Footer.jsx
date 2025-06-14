import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-500 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code className="text-green-400" size={16} />
            <span className="text-gray-300">by</span>
            <span className="gradient-text font-semibold">Deon Hill</span>
          </div>
          
          <div className="text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} • Crafting intelligent solutions</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;